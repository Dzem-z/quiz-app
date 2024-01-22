import { DATA_FETCHER } from "./dataFetcher.js";
import { MapLoader } from "./mapLoader.js";
import { createWorld } from "./world.js";

const map = L.map('map');
const mapLoader = new MapLoader(map);
const world = await createWorld();
mapLoader.loadChooser(world);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

alert("Data loaded!");
