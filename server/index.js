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
    //test
    res.json({message: "Hello world!"});
});

app.get("/api/countries", async (req, res) => {
    /**
     * this endpoint sends all country info from local database.
     * The result is json in format:
     * [
     * ...,
     * {
     *  "id":(:country id),
     *  "name":(:country name),
     *  "overpass_name":(:the string that identifies country in overpass remote database)
     * }
     * ...
     * ]
     */
    let countries = await runQuery("CALL GetCountries()");
    console.log("fetched countries from database");
    return res.json(countries);
})

app.get("/api/administratives/:level_number([0-9]+)/:admin_name", async (req,res) => {
    /**
     * This endpoint sends all administrative regions on a certain administrative level specified as :level_number within region with :name string specified as :admin_name 
     * (Notice that country name is also an admin_name).
     * The result is json in format:
     * 
     * {
     *  ...,
     *  "osm3s" : {
     *  ... (contains overpass footer)
     *  }
     *  "elements" : [
     *      ...,
     *      {
     *          ...
     *          "tags": {
     *              ...,
     *              "name": (administrative name for certain element),
     *              "name:(:lan)": (name specific for language given by :lan abbreviation),
     *              ... 
     *          }
     *      }
     *      ...
     *  ]
     * }
     */
    let response = await overpassAPI.getAdministratives(req.params.admin_name, req.params.level_number);
    return res.send(response);
})

app.get("/api/geometry/:level_number([0-9])/:factor([0-9]+)/:admin_name", async (req,res) => {
    /**
     * This endpoint sends geometry for all administrative regions at the level specified with :level_number within region with :name string specified as :admin_name.
     * (Notice that country name is also an admin_name). Geometry is defined in geojson format as polygons or multipolygons. Vertices are optimized out with :factor variable.
     * Only roughly 1/:factor points are left (For example if you set factor=2 then 1/2 of the points will be opitmized out). Points are optimized out evenly.
     * The output is json in geoJson format specified like below:
     * {
     * "type":"FeatureCollection",
     * "features": [
     *      ...,
     *      {
     *          "type": "Feature",
     *          ...,
     *          "properties" : {
     *              ... (this is some metadata about current object)
     *           },
     *          "geometry": {
     *              "type":(type of geometry (either polygon or multipolygon)),
     *              "coordinates" : [ (array of polygons)
     *                  ...,
     *                  [   (array of cordinates specified for certain polygon)
     *                      ...,
     *                      [
     *                          (:longtitude),
     *                          (:latitude)
     *                      ],
     *                      ...
     *                  ],
     *                  ...
     *              ]
     *           }
     *      },
     *      ...
     *      ]
     * }
     */
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