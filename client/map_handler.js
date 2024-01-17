import {QuizFetcher} from "./fetch_data.js";
import {QuizHandler} from "./quiz_handler.js"
const map = L.map('map').setView([37.8, -96], 4);
const quizFetcher = new QuizFetcher();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.setUp();
    return this._div;
};

info.setUp = function (props) {
    this._div.innerHTML = '<h4 id="prompt">Waiting for data to load...</h4>';
};
info.addTo(map);
info.printResult = function (result) {
    this.getContainer().lastChild.innerHTML = result ? 'Correct!' : 'Wrong';
    this.getContainer().lastChild.style.color = result ? 'green' : 'red';
}

info.printPrompt = function(prompt) {
    this.getContainer().firstChild.innerHTML = prompt;
}

let v = await quizFetcher.fetchQuiz().then((data) => data.json());
v = v.features;
v = v.filter((feature) => "name" in feature.properties);
alert("Data loaded, let's start the quiz!");

let names = v.map((feature) => feature.properties.name);

let handler = new QuizHandler(names, info);

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: handler.highlightFeature, 
        mouseout: handler.resetHighlight,
        click: handler.handleClick
    });
}        
                    
let geojson = L.geoJson(v,{onEachFeature}).addTo(map);