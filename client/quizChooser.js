import { DATA_FETCHER } from "./dataFetcher.js";
import { EventHandler } from "./eventHandler.js";
import {STYLES} from "./polygonStyles.js";
import { QuizControl } from "./quizControl.js";
import { QuizHandler } from "./quizHandler.js";

export class QuizChooser extends EventHandler {

    constructor(loader, info) {
        super();
        this.loader = loader;
        this.info = info;
        this.info.innerHTML = `<h4>World</h4>
            Choose quiz<br>
            <button>countries</button><br>
            or click an area on the map<br>
            to have a quiz from there`;
        this.info.children[2].addEventListener("click", async () => {
            let mapData = await DATA_FETCHER.fetchCountriesGeometries();
            mapData = mapData.features;
            this.info.remove();
            let control = new QuizControl();
            this.loader.addToMap(control);
            this.loader.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), control);
            this.loader.loadData(mapData)});
    }
    
    handleClick = async (e) => {
        if (this.divisionLevels != undefined && this.divisionLevels.length == 0) {
            alert("No further division for this area");
            return;
        }

        let layer = e.target;
        let adminName = layer.feature.properties.name;

        if (layer.feature.properties.admin_level == 2) {
            let countryId = this.loader.getCountryId(adminName);
            this.divisionLevels = await DATA_FETCHER.fetchCountryDivisionLevels(countryId);
            let arr = [1];
            this.divisionLevels = arr.concat(this.divisionLevels);
        }
        
        let nextLevelMapData = await this.getMapDataForNextLevel(adminName);
        if(nextLevelMapData === null) return;
        let mapData = nextLevelMapData.mapData;
        this.divisionLevels.splice(0, nextLevelMapData.levelsSkipped);
        this.removeButtons();
        this.addButtons(adminName);
        this.info.firstChild.innerHTML = adminName;
        mapData = mapData.features;
        this.loader.loadData(mapData)
    }

    removeButtons = () => {
        let buttons = this.info.getElementsByTagName('button');
        buttons = Array.from(buttons);
        for(let button of buttons) {
            button.nextElementSibling.remove();
            button.remove();
        }
    }

    addButtons = (adminName) => {
        for(let level of this.divisionLevels) {
            let button = document.createElement('button');
            let br = document.createElement('br');
            button.innerHTML = level.name;
            button.addEventListener("click", async () => {
                let mapData = await DATA_FETCHER.fetchAdministratives(level.level_number, adminName);
                mapData = mapData.features;
                if (mapData.length == 0) {
                    alert(`No areas of this type here!
                        Pick another quiz`);
                        return;
                }
                this.info.remove();
                let control = new QuizControl();
                this.loader.addToMap(control);
                this.loader.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), control);
                this.loader.loadData(mapData)});
            this.info.append(button);
            this.info.append(br);
        }
    }

    getMapDataForNextLevel = async (adminName) => {
        let mapData = {features: []};
        let nextDivisionLevelIndex = 0;

        while (mapData.features.length == 0) {
            ++nextDivisionLevelIndex;
            if (nextDivisionLevelIndex >= this.divisionLevels.length) {
                alert("No further division for this area");
                return null;
            }
            let nextLevelNumber = this.divisionLevels[nextDivisionLevelIndex].level_number;
            mapData = await DATA_FETCHER.fetchAdministratives(nextLevelNumber, adminName);
        }

        return {
            levelsSkipped: nextDivisionLevelIndex,
            mapData: mapData
        };
    }
}