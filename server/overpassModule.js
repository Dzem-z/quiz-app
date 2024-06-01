const { features } = require("process");
const queries = require("./queries.js");
const quizzes = require("./quizzes_meta.js");
const geoJSONparser = require("./geoJsonModule.js");

 class OverpassAPI {
    
    async getAdministratives(areaName, levelNumber) {
        console.log(`
        [out:json]
        [timeout:90]
        ;
        area[name="${areaName}"];
        relation[boundary=administrative][admin_level=${levelNumber}](area) -> .a;
        .a out tags;
        `)
        let query = encodeURIComponent(`
        [out:json]
        [timeout:90]
        ;
        area[name="${areaName}"];
        relation[boundary=administrative][admin_level=${levelNumber}](area) -> .a;
        .a out tags;
        `);

        let result = await this.fetchData(query)
        .then(
            (data) => data.json()
        ).then(
            (data) => {return {result:data, error:undefined}}
        ).catch(
            (error) => {return {result:undefined, error:this.errorHandler(error)}}
        );
        return result;
    };

    async getGeometry(areaName, levelNumber, optimizationFactor = 1){
        console.log(`
        [out:json]
        [timeout:90]
        ;
        area[name="${areaName}"];
        relation[boundary=administrative][admin_level=${levelNumber}](area) -> .a;
        .a out geom;
        `)
        let query = encodeURIComponent(`
        [out:json]
        [timeout:90]
        ;
        area[name="${areaName}"];
        relation[boundary=administrative][admin_level=${levelNumber}](area) -> .a;
        .a out geom;
        `);

        let result = await this.fetchData(query)
        .then(
            (data) => data.json()
        ).then(
            (data) => geoJSONparser.parse(data)
        ).then(
            (data) => geoJSONparser.simplifyGeometry(data, optimizationFactor)
        ).then(
            (data) => geoJSONparser.filterPolygons(data)
        ).then(
            (data) => {return {result:data, error:undefined}}
        ).catch(
            (error) => {return {result:undefined, error:this.errorHandler(error)}}
        );
        return result;
    }

    async getGeometryOfCountry(overpassName, optimizationFactor = 1) {
        console.log(`
        [out:json]
        [timeout:90]
        ;
        relation[boundary=administrative][name="${overpassName}"][admin_level=2] -> .a;
        .a out geom;
        `)
        let query = encodeURIComponent(`
        [out:json]
        [timeout:90]
        ;
        relation[boundary=administrative][name="${overpassName}"][admin_level=2] -> .a;
        .a out geom;
        `);

        let result = await this.fetchData(query)
        .then(
            (data) => data.json()
        ).then(
            (data) => geoJSONparser.parse(data)
        ).then(
            (data) => geoJSONparser.simplifyGeometry(data, optimizationFactor)
        ).then(
            (data) => geoJSONparser.filterPolygons(data)
        ).then(
            (data) => {return {result:data, error:undefined}}
        ).catch(
            (error) => {return {result:undefined, error:this.errorHandler(error)}}
        );
        return result;
    }

    errorHandler(error) {
        console.log(error);
    
        if(error instanceof TypeError && error.message == "fetch failed") {
            return error;
        } else if(error instanceof SyntaxError) {
            return error;
        } else {
            throw error;
        }
    }

    async waitForConnection(fetchFunc, ...args) {
        let response;
        try{
            response = await fetchFunc(...args)
        } catch (error) {
            console.log("There was an error.", error.name, error.message)
        }

        if (response?.ok) {
            console.log('Use the response here!');
        } else {
            console.log(`HTTP Response Code: ${response?.status}`)
        }
        return response;  
    }

    async fetchData(query) {
        return await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: "data=" + query
            }
        )
    }

    async fetchQuiz(id, optimizationFactor = 1) {  
        //downloads quiz and applies parser to fetched data
        let start = Date.now();
        console.log("started fetching--")
        let result = await this.fetchData(
            this.getURIbyId(id)
        ).then(
            (data)=>data.json()
        ).then(
            (data) => geoJSONparser.simplifyGeometry(geoJSONparser.parse(data), optimizationFactor)
        );
        console.log("ended:");console.log((Date.now() - start) + "ms")
        return result;
    };

    getQuizzes() {
        return quizzes;
    };

    getURIbyId(id) {
        return queries[id];
    };

    async test(id){
        let result = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: "data=" + this.getURIbyId(id)
            }
        ).then(
            (data)=>data.json()
        ).then(
            (data) => geoJSONparser.simplifyGeometry(geoJSONparser.parse(data), 2)
        )
        return result;
    }

    
}



module.exports = OverpassAPI;




