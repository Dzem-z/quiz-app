import { DATA_FETCHER } from "./dataFetcher.js";
import { MapLoader } from "./mapLoader.js";
import { createWorld } from "./world.js";
import { loadingScreenSwapper } from "./loadingScreenSwapper.js";

loadingScreenSwapper.startLoad();
const map = L.map('map');
//L.control.scale().addTo(map);
//map.setMinZoom(0);
//map.setMaxZoom(8);
const mapLoader = new MapLoader(map);
const world = await createWorld();
mapLoader.loadChooser(world);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

loadingScreenSwapper.endLoad();
