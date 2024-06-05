import { DATA_FETCHER } from "./dataFetcher.js";
import { MapLoader } from "./mapLoader.js";
import { createWorld } from "./world.js";
import { createOrGetInstance } from "./mapTileLayerControl.js";



const map = L.map('map');
createOrGetInstance(map);
const mapLoader = new MapLoader(map);
const world = await createWorld();
mapLoader.loadChooser(world);


