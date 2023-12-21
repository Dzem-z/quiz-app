const path = require("path");
const express = require("express");
const overpass = require("./overpassModule");

const PORT = process.env.PORT || 3000;

const app = express();

const overpassAPI = new overpass();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({message: "Hello world!"});
});

app.get("/api/maps", (req, res) => {    //endpoint to get map info
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