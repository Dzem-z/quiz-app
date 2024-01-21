import { DATA_FETCHER } from "./dataFetcher.js";
import { EventHandler } from "./eventHandler.js";
import {World, createWorld} from "./world.js"
import { AdminUnit } from "./adminUnit.js";
import {STYLES} from "./polygonStyles.js";

export class QuizChooser extends EventHandler {

    constructor(loader, info) {
        super();
        this.loader = loader;
        this.info = info;
        this.info.innerHTML = `<h4></h4>
            Choose quiz<br>
            or click an area on the map<br>
            to have a quiz from there`;
    }

    loadAdminUnit = function() {
        this.loader.loadData(this.mapArea.getMapData().features);
        this.info.firstElementChild.innerHTML = this.mapArea.getAreaName();
        this.loadButtons(this.mapArea.getButtonsData());
    }

    loadButtons = function(buttonsData) {
        for(let level of buttonsData) {
            let button = document.createElement('button');
            let br = document.createElement('br');
            button.innerHTML = level.name;
            button.addEventListener("click", async () => {
                let mapData = await level.fetcher();
                if (mapData.features.length == 0) {
                    alert(`No areas of this type here!
                        Pick another quiz`);
                        return;
                }
                this.info.remove();
                this.loader.loadQuiz(mapData);
            })
            let index = this.info.childElementCount-2;
            this.info.children[index].after(button);
            this.info.children[index+1].after(br);
        }
    }
    
    handleClick = async (e) => {
        
        let layer = e.target;
        let adminName = layer.feature.properties.name;
        let nextAdminUnit = await this.mapArea.getNextAdminUnit(adminName);
        
        if (nextAdminUnit === null) {
            alert("No further division for this area");
            return;
        }

        this.mapArea = nextAdminUnit;
        this.removeButtons();
        this.loadAdminUnit();
    }

    removeButtons = () => {
        let buttons = this.info.getElementsByTagName('button');
        buttons = Array.from(buttons);
        for(let button of buttons) {
            button.nextElementSibling.remove();
            button.remove();
        }
    }
}