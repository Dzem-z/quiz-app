const osmtogeojson = require('osmtogeojson');

geoJSONparser = {
    parse : function(json){
        return osmtogeojson(json);
    },

    simplifyGeometry : function(geoJson, optimizationFactor){
        /**
         * evenly removes most of the points.
         * the points that remain are roughly in the proportion 1/(optimizationFactor) to all points before optimization.
         * */
        console.log("entered--");
        let start = Date.now();
        if(geoJson.features != undefined) {
            pointsLeft = new Set([]);   //all points that will not be optimized out
            nPoints = new Map();    //multipolygonal points


            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon' || feature.geometry.type == 'MultiPolygon'){
                    let encapsulate;
                    if(feature.geometry.type == 'Polygon')
                        encapsulate = [feature.geometry.coordinates];
                    else
                        encapsulate = feature.geometry.coordinates;
                    // counts multipolygonal points (points that belong to more than 2 polygons) and leaves them untouched.
                    for(polygonCordinates of encapsulate){
                        let firstStringifiedPoint = String(polygonCordinates[0][0]);
                        //count points
                        if(nPoints.has())
                            nPoints.set(firstStringifiedPoint, nPoints.get(firstStringifiedPoint) + 1);
                        else
                            nPoints.set(firstStringifiedPoint, 1);
                
                        //add connecting point (first point must remain and have the same coordinates as last point).
                        pointsLeft.add(firstStringifiedPoint);
                        let iter = 0;
                        let localOptimizationFactor;
                        if(polygonCordinates[0].length/optimizationFactor <= 4)
                            localOptimizationFactor = polygonCordinates[0].length / 5;
                        else
                            localOptimizationFactor = optimizationFactor;

                        for(let point of polygonCordinates[0]){
                            let stringifiedPoint = String(point);
                            if(nPoints.has(stringifiedPoint))
                                nPoints.set(stringifiedPoint, nPoints.get(stringifiedPoint) + 1);
                            else
                                nPoints.set(stringifiedPoint, 1);
                            if(iter >= localOptimizationFactor){
                                iter = 0;
                                pointsLeft.add(stringifiedPoint);
                            }
                            iter++;
                        }
                    }
                }
            }
            //add nPoints where n > 2
            //console.log(nPoints.entries());
            for(let point of nPoints) {
                if(point[1] > 2){
                    //console.log("mPoint: " + point[0] +"num:" + point[1]);
                    pointsLeft.add(point[0]);
                }
            }

            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon' || feature.geometry.type == 'MultiPolygon'){
                    let encapsulate;
                    if(feature.geometry.type == 'Polygon')
                        encapsulate = [feature.geometry.coordinates];
                    else
                        encapsulate = feature.geometry.coordinates;
                    for(let i = 0; i < encapsulate.length; i++){
                        //console.log(i);
                        let coordinates = encapsulate[i][0];
                        encapsulate[i][0] = [];
                        //console.log(coordinates[2]);
                        for(let point of coordinates){
                            //console.log(i);
                            if(pointsLeft.has(String(point))){
                                encapsulate[i][0].push(point);
                            }
                        }
                    }
                }
            }
        }
        console.log(`ended---: time: ${Date.now() - start} ms`);
        return geoJson;
    },

    filterPolygons : function(geoJson) {
        /**
         * removes all geometry except polygons and multipolygons.
         */
        if(geoJson.features != undefined) {
            let featuresOld = geoJson.features;
            geoJson.features = [];
            for(let feature of featuresOld){
                if(feature.geometry.type == 'Polygon' || feature.geometry.type == 'MultiPolygon'){
                    geoJson.features.push(feature);
                }
            }
        }
        return geoJson;
    }
}

module.exports = geoJSONparser