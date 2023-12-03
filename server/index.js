const path = require("path");
const express = require("express");
const overpassAPI = require("./overpassModule");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({message: "Hello world!"});
});

app.get("/api/maps", (req, res) => {
    return res.json(overpassAPI.getQuizzes())
})

app.get("/api/quizzes/:id([0-9]+)", async (req, res) => {
    let body;
    try {
    body = overpassAPI.getURIbyId(req.params.id)
    let result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            body: body
        }
    ).then(
        (data)=>data.json()
    );

    return res.json(result);

    }catch(error) {
        return res.send("wrong id");
    }
    
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});