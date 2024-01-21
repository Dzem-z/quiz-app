import { QuizChooser } from "./quizChooser.js";
import { ChooserControl } from "./chooserControl.js"
import { STYLES } from "./polygonStyles.js";
import { QuizHandler } from "./quizHandler.js";
import { QuizControl } from "./quizControl.js";
import { createWorld } from "./world.js";

export class MapLoader {

    constructor(map) {
        this.map = map;
    }

    loadChooser = function (world) {
        let chooserControl = new ChooserControl();
        chooserControl.setLoader(this);
        this.addToMap(chooserControl);
        this.eventHandler = new QuizChooser(this, chooserControl);
        this.eventHandler.mapArea = world;
        this.eventHandler.loadAdminUnit();
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