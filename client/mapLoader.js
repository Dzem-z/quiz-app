import { QuizChooser } from "./quizChooser.js";
import { QuizHandler } from "./quizHandler.js";

export class MapLoader {

    constructor(map, countries) {
        this.info = L.control();
        let info = this.info;

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.setUp();
            return this._div;
        };

        info.setUp = function (props) {
            this._div.innerHTML = '<h4 id="prompt">Waiting for data to load...</h4>';
        };
        info.addTo(map);

        this.map = map;
        this.countries = countries;
        this.eventHandler = new QuizChooser(this, this.info.getContainer());
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
        }        
                            
        this.geojson = L.geoJson(mapData,{onEachFeature}).addTo(this.map);
    }

    getCountryId = function (name) {
        let country = this.countries.filter((country) => {return country.overpass_name === name; })[0];
        return country.id;
    }
}