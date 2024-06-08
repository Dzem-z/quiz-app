import { QuizChooser } from "./quizChooser.js";
import { ChooserControl } from "./chooserControl.js"
import { STYLES } from "./polygonStyles.js";
import { QuizHandler } from "./quizHandler.js";
import { QuizControl } from "./quizControl.js";
import { createWorld } from "./world.js";
import { ReturnButton } from "./returnButton.js";
import { getInstance } from "./mapTileLayerControl.js";

export class MapLoader {

    constructor(map) {
        this.map = map;
        this.backButton = L.control();
        this.started = false;
        this.backButton.setPosition("bottomright");

        this.backButton.onAdd = (map) => {
            this._div = L.DomUtil.create('div', 'control');
            let button = new ReturnButton({name: "Back to Quiz Choosing", fetcher: null}, this);
            this._div.append(button.getElement());
            return this._div;
        };

    }
    
    loadChooser = function (world) {
        if(this.started === false) {
            this.addToMap(this.backButton);
            this.started = true;
        }
        if (this.eventHandler != undefined) {
            this.eventHandler.removeBanner();
            this.eventHandler.removeControl();
        } 
        getInstance().turnOn();
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
        if (this.eventHandler != undefined) 
            this.eventHandler.removeControl();
        mapData = mapData.features;
        mapData = mapData.filter((feature) => "name" in feature.properties);
        getInstance().turnOff();
        this.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), this);
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