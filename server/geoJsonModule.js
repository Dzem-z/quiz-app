const osmtogeojson = require('osmtogeojson');

geoJSONparser = {
    parse : function(geoJson){
        return osmtogeojson(geoJson);//to do in the future
    },

    simplifyGeometry : function(geoJson, optimizationFactor){
        console.log("entered--");
        let start = Date.now();
        pointsLeft = new Set([]);   //all points that will not be optimized out
        if(geoJson.features != undefined) {
            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon'){
                    let iter = 0;
                    for(let point of feature.geometry.coordinates[0]){
                        if(iter >= optimizationFactor){
                            iter = 0;
                            pointsLeft.add(point);
                        }
                        iter++;
                    }
                }
            }

            for(let feature of geoJson.features){
                if(feature.geometry.type == 'Polygon'){
                    let coordinates = feature.geometry.coordinates[0];
                    feature.geometry.coordinates = [[]];
                    for(let point of coordinates){
                        if(pointsLeft.has(point)){
                            feature.geometry.coordinates[0].push(point);
                        }
                    }
                    console.log(feature.geometry.coordinates[0].length/coordinates.length);
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

module.exports = geoJSONparser