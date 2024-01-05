const osmtogeojson = require('osmtogeojson');

geoJSONparser = {
    parse : function(json){
        return osmtogeojson(json);
    },

    simplifyGeometry : function(geoJson, optimizationFactor){
        console.log("entered--");
        let start = Date.now();
        if(geoJson.features != undefined) {
            pointsLeft = new Set([]);   //all points that will not be optimized out
            nPoints = new Map();


            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon' || feature.geometry.type == 'MultiPolygon'){
                    /**
                    * counts multipolygonal points (points that belong to more than 2 polygons) and evenly removes most of the points.
                    * the points that remain are roughly in the proportion 1/(optimizationFactor) to all points before optimization.
                    */
                    for(polygonCordinates of feature.geometry.coordinates){
                        let firstStringifiedPoint = String(feature.geometry.coordinates[0][0]);
                        //count points
                        if(nPoints.has())
                            nPoints.set(firstStringifiedPoint, nPoints.get(firstStringifiedPoint) + 1);
                        else
                            nPoints.set(firstStringifiedPoint, 1);
                
                        //add connecting point
                        pointsLeft.add(firstStringifiedPoint);
                        let iter = 0;
                        for(let point of polygonCordinates){
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
                if(feature.geometry.type == 'Polygon' || feature.geometry.type == 'MultiPolygon'){
                    for(polygons of feature.geometry.coordinates){
                        let coordinates = polygons[0];
                        polygons = [[]];
                        for(let point of coordinates){
                            if(pointsLeft.has(String(point))){
                                polygons[0].push(point);
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