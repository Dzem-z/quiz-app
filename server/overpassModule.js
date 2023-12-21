const { features } = require("process");
const queries = require("./queries.js");
const quizzes = require("./quizzes_meta.js");
const geoJSONparser = require("./geoJsonModule.js");

 class OverpassAPI {
    
    async fetchQuiz(id, optimizationFactor = 1) {  
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
            (data) => geoJSONparser.simplifyGeometry(geoJSONparser.parse(data), optimizationFactor)
        );
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




