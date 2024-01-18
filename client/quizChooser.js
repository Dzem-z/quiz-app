import { DataFetcher } from "./dataFetcher.js";
import { QuizHandler } from "./quizHandler.js";

export class QuizChooser {

    constructor(loader, info) {

        this.loader = loader;
        this.adminName = null;
        this.fetcher = new DataFetcher();
        this.info = info;
        this.info.innerHTML = `<h4>World</h4>
            Choose quiz<br>
            <button>countries</button><br>
            or click an area on the map<br>
            to have a quiz from there`;
        this.info.children[2].addEventListener("click", async () => {
            let mapData = await this.fetcher.fetchCountriesGeometries().then((data) => data.json());
            mapData = mapData.features;
            this.loader.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), this.info);
            this.loader.loadData(mapData)});
    }

    highlightFeature = (e) => {
        let layer = e.target;
        layer.setStyle({
            color: 'red'
        });
        layer.bringToFront();
    }
    
    resetHighlight = (e) => {
        let layer = e.target
        layer.setStyle({
            color: 'blue'
        });
    }
    
    handleClick = async (e) => {
        let layer = e.target;
        this.adminName = layer.feature.properties.name;
        this.info.firstChild.innerHTML = "Waiting for data to load...";
        let buttons = this.info.getElementsByTagName('button');
        buttons = Array.from(buttons);
        for(let button of buttons) {
            button.remove();
        }
        if (layer.feature.properties.admin_level == 2) {
            let countryId = this.loader.getCountryId(this.adminName);
            this.divisionLevels = await this.fetcher.fetchCountryDivisionLevels(countryId).then((data) => data.json());
        }
        else {
            this.divisionLevels.splice(0,1);
        }
        let nextLevelNumber = this.divisionLevels[0].level_number;
        let mapData = await this.fetcher.fetchAdministratives(nextLevelNumber, this.adminName).then((data) => data.json());
        for(let level of this.divisionLevels) {
            let button = document.createElement('button');
            button.innerHTML = level.name;
            button.addEventListener("click", async () => {
                alert(this.adminName);
                let mapData = await this.fetcher.fetchAdministratives(level.level_number, this.adminName).then((data) => data.json());
                mapData = mapData.features;
                this.loader.eventHandler = new QuizHandler(mapData.map((feature) => feature.properties.name), this.info);
                this.loader.loadData(mapData)});
            this.info.append(button);
        }
        this.info.firstChild.innerHTML = this.adminName;
        mapData = mapData.features;
        this.loader.loadData(mapData)

    }

    getNextDivisionLevel = (currentLevel) => {
        let levels = this.divisionLevels.map((level) => {return level.level_number;});
        let index = levels.findIndex((elem) => elem == currentLevel)+1;
        return this.divisionLevels[index].level_number;
    } 
}