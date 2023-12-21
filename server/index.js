const path = require("path");
const express = require("express");
const overpass = require("./overpassModule");
const mysql = require("mysql");


const PORT = process.env.PORT || 3000;
const HOSTNAME = 'localhost'; //hardcoded
const DATABASE_USERNAME = 'quiz';
const DATABASE_PASSWORD = 'quiz_password';
const DATABASE_NAME = 'quizdb';

const pool = mysql.createPool({
    host : HOSTNAME,
    user : DATABASE_USERNAME,
    password : DATABASE_PASSWORD,
    database : DATABASE_NAME
});



const app = express();

const overpassAPI = new overpass();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({message: "Hello world!"});
});

app.get("/api/countries", (req, res) => {    //endpoint to get map info
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        console.log("fetched countries from database");
        connection
    })
    return res.json(overpassAPI.getQuizzes())
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