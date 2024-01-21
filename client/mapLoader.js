import { QuizChooser } from "./quizChooser.js";
import { STYLES } from "./polygonStyles.js";
import { QuizHandler } from "./quizHandler.js";
import { QuizControl } from "./quizControl.js";
import { createWorld } from "./world.js";

export class MapLoader {

    constructor(map, world) {
        this.info = L.control();
        let info = this.info;

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'control');
            this.setUp();
            return this._div;
        };

        info.setUp = function (props) {
            this._div.innerHTML = '<h4 id="prompt">Waiting for data to load...</h4>';
        };
        info.addTo(map);

        this.map = map;
        this.eventHandler = new QuizChooser(this, this.info.getContainer());
        this.eventHandler.mapArea = world;
        this.eventHandler.loadAdminUnit();
    }

    loadChooser = function () {
        let chooserControl = L.ChooserControl();
        this.addToMap(chooserControl);
        this.eventHandler = new QuizChooser(this, chooserControl);
    }

    addToMap = function (object) {
        object.addTo(this.map);
    }

    loadQuiz = function (mapData) {
        mapData = mapData.features;
        mapData = mapData.filter((feature) => "name" in feature.properties);
        let control = new QuizControl();
        this.addToMap(control);
        this.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), control, this);
        this.loadData(mapData);
    }

    loadData = function (mapData) {

        if(this.geojson != undefined)
            this.geojson.remove();
        let eventHandler = this.eventHandler;

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: eventHandler.highlightFeature, 
                mouseout: eventHandler.resetHighlight,
                click: eventHandler.handleClick
            });

            layer.setStyle(STYLES.basic);
        }        
                            
        this.geojson = L.geoJson(mapData,{onEachFeature}).addTo(this.map);
        this.map.fitBounds(this.geojson.getBounds());
    }
}

export let createMapLoader = async function (map) {
    let world = await createWorld();
    return new MapLoader(map, world);
}