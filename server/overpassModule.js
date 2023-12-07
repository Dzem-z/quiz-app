const { features } = require("process");
const queries = require("./queries.js");

var quizzes = [
    //{quizName, id}
    
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
        for(feature in geoJson)
            console.log(feature);
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
    

    async fetchQuiz(id, parser = function(val){return val;}) {
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
            (data) => geoJSONparser.filterPolygons(data)
        )
        geoJSONparser.simplifyGeometry(result, 2);
        return result;
    }

    
}

module.exports = OverpassAPI;




