import { AbstractButton } from "./abstractButton.js";
import { loadingScreenSwapper } from "./loadingScreenSwapper.js";

export class QuizLoaderButton extends AbstractButton {
    constructor(buttonData, control) {
        super(buttonData);
        this.control = control;
    }

    load = function (mapData) {
        this.control.loadQuiz(mapData);
    }

    fetch = async function (fetcher) {
        loadingScreenSwapper.startLoad();

        if (this.control.loading)
            return null;
        this.control.loading = true;
        let mapData = await fetcher();
        if (mapData.features.length == 0) {
            alert(`No areas of this type here!
                Pick another quiz`);
            this.control.loading = false;
            return null;
        }

        
        loadingScreenSwapper.endLoad();
        return mapData;
    }
}