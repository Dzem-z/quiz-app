import { EventHandler } from "./eventHandler.js";
import {STYLES} from "./polygonStyles.js";

export class QuizChooser extends EventHandler {

    constructor(loader, control) {
        super();
        this.loader = loader;
        this.control = control;
    }

    loadAdminUnit = function() {
        this.control.removeButtons();
        this.loader.loadData(this.mapArea.getMapData().features);
        this.control.setName(this.mapArea.getAreaName());
        this.control.loadButtons(this.mapArea.getButtonsData());
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
        this.loadAdminUnit();
    }
}