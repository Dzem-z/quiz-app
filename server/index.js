const path = require("path");
const express = require("express");
const overpass = require("./overpassModule");
const mysql = require("mysql2");


const PORT = process.env.PORT || 3000;
const HOSTNAME = '127.0.0.1'; //hardcoded
const DATABASE_USERNAME = 'quiz';
const DATABASE_PASSWORD = 'quiz_password';
const DATABASE_NAME = 'quizdb';

const pool = mysql.createPool({
    host : HOSTNAME,
    user : DATABASE_USERNAME,
    password : DATABASE_PASSWORD,
    database : DATABASE_NAME
});

const promisePool = pool.promise();

const app = express();

const overpassAPI = new overpass();


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({message: "Hello world!"});
});

app.get("/api/countries", async (req, res) => {    //endpoint to get country info
    let countries = await runQuery("CALL GetCountries()");
    console.log("fetched countries from database");
    return res.json(countries);
})

app.get("/api/administratives/:level_number([0-9]+)/:admin_name", async (req,res) => {
    let response = await overpassAPI.getAdministratives(req.params.admin_name, req.params.level_number);
    return res.send(response);
})

app.get("/api/geometry/:level_number([0-9])/:factor([0-9]+)/:admin_name", async (req,res) => {
    let response = await overpassAPI.getGeometry(req.params.admin_name, req.params.level_number, req.params.factor);
    return res.send(response);
})

app.get("/api/levels/:countryID([0-9]+)", async (req, res) => {
    queryLevels = [];
    levelNames = [];
    for(i = 2; i < 12; i++){    //get administrative levels from uri params
        if(req.query[`level${i}`] != undefined){
            levelNames.push(req.query[`level${i}`]);
            queryLevels.push(i);
        }
    }
    let levels = (await runQuery("CALL GetAdministrativeLevel(?)", [req.params.countryID])).map(obj=>obj.level_number); //get administrative levels from database

    for(i in levelNames){
        if(!levels.find(i)) {
            return res.send("wrong query parameters!");
        }
    }



    return res.json(levels);
})

app.get("/text/:id([0-9]+)", async (req, res) => {
    console.log(overpassAPI.getURIbyId(req.params.id))
    let result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            body: "data=" + overpassAPI.getURIbyId(req.params.id)
        }
    ).then(
        (data)=>data.text()
        );
    return res.send(result);
})

app.get("/api/quizzes/:factor([0-9]+)/:id([0-9]+)", async (req, res) => {   //returns quiz info in geoJson format

        let result = await overpassAPI.fetchQuiz(req.params.id, req.params.factor);
        return res.json(result);
    
})

app.get('/', (req, res) => {    //home (main page)
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


async function runQuery(queryBody, params) {
    return (await promisePool.query(queryBody, params))[0][0];  //takes only returned rows (without metadata)
}