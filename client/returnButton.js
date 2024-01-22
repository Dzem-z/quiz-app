import { AbstractButton } from "./abstractButton.js";
import { createWorld } from "./world.js";

export class ReturnButton extends AbstractButton {
    constructor(buttonData, loader) {
        super(buttonData);
        this.loader = loader;
    }

    fetch = async function () {
        return await createWorld();
    }

    load = function (mapData) {
        this.loader.loadChooser(mapData);
    }
}