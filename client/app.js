import {DataFetcher} from "./dataFetcher.js";
import { MapLoader } from "./mapLoader.js";

const map = L.map('map').setView([37.8, -96], 4);
const dataFetcher = new DataFetcher();
const countries = await dataFetcher.fetchCountries().then((data) => data.json()); 
const mapLoader = new MapLoader(map, countries);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let v = await dataFetcher.fetchCountriesGeometries().then((data) => data.json());
v = v.features;
v = v.filter((feature) => "name" in feature.properties);

mapLoader.loadData(v);
alert("Data loaded!");
