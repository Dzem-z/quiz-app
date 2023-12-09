const { features } = require("process");
const queries = require("./queries.js");
const { count } = require("console");

var quizzes = [
    /**
     * name - quiz name
     * id - the unique quiz identifier
     * type - specifies the type of a geographic objects {Polygon, Point}
     */
    
    {name: "Krakow", id: -1, type: "Polygon", label: "test"},
    {name: "wojewodztwa", id : 0},
    {name: "Miasta wojewodzkie", id : 1, type: "Polygon"},
    {name: "Miasta wojewodzkie", id : 2, type: "Point"}
]

geoJSONparser = {
    parse : function(geoJson){
        return geoJson;//to do in the future
    },

    simplifyGeometry : function(geoJson, optimizationFactor){
        console.log("entered--");
        let start = Date.now();
        if(geoJson.features != undefined) {
            pointsLeft = new Set([]);   //all points that will not be optimized out
            nPoints = new Map();


            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon'){
                    
                    let firstStringifiedPoint = String(feature.geometry.coordinates[0][0]);
                    //count points
                    if(nPoints.has())
                        nPoints.set(firstStringifiedPoint, nPoints.get(firstStringifiedPoint) + 1);
                    else
                        nPoints.set(firstStringifiedPoint, 1);

                    //add connecting point
                    pointsLeft.add(firstStringifiedPoint);
                    let iter = 0;
                    for(let point of feature.geometry.coordinates[0]){
                        let stringifiedPoint = String(point);
                        if(nPoints.has(stringifiedPoint))
                            nPoints.set(stringifiedPoint, nPoints.get(stringifiedPoint) + 1);
                        else
                            nPoints.set(stringifiedPoint, 1);
                        if(iter >= optimizationFactor){
                            iter = 0;
                            pointsLeft.add(stringifiedPoint);
                        }
                        iter++;
                    }
                }
            }
            //add nPoints where n > 2
            console.log(nPoints.entries());
            for(let point of nPoints) {
                if(point[1] > 2){
                    console.log("mPoint: " + point[0] +"num:" + point[1]);
                    pointsLeft.add(point[0]);
                }
            }

            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon'){
                    let coordinates = feature.geometry.coordinates[0];
                    //console.log(pointsLeft.has(String(feature.geometry.coordinates[0][feature.geometry.coordinates[0].length - 1])));
                    //console.log(pointsLeft.has(String(coordinates[coordinates.length - 1])));
                    feature.geometry.coordinates = [[]];
                    for(let point of coordinates){
                        if(pointsLeft.has(String(point))){
                            feature.geometry.coordinates[0].push(point);
                        }
                    }
                    //console.log(feature.geometry.coordinates[0].length/coordinates.length);
                }
            }
        }
        console.log(`ended---: time: ${Date.now() - start} ms`);
        return geoJson;
    },

    filterPolygons : function(geoJson) {
        if(geoJson.features != undefined) {
            let featuresOld = geoJson.features;
            geoJson.features = [];
            for(let feature of featuresOld){
                if(feature.geometry.type == 'Polygon'){
                    geoJson.features.push(feature);
                }
            }
        }
        return geoJson;
    }
}

 class OverpassAPI {
    

    async fetchQuiz(id, parser = function(val){return val;}, optimizationFactor = 1) {  
        //downloads quiz and applies parser to fetched data
        let result = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: "data=" + this.getURIbyId(id)
            }
        ).then(
            (data)=>data.json()
        ).then(
            (data) => parser(data)
        ).then(
            (data) => geoJSONparser.simplifyGeometry(data, optimizationFactor)
        );
        return result;
    };

    getQuizzes() {
        return quizzes;
    };

    getURIbyId(id) {
        return queries[id];
    };

    async test(id, parser  = function(val){return val;}){
        let result = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: "data=" + this.getURIbyId(id)
            }
        ).then(
            (data)=>data.json()
        ).then(
            (data) => parser(data)
        ).then(
            (data) => geoJSONparser.simplifyGeometry(data, 2)
        )
        return result;
    }

    
}

module.exports = OverpassAPI;




