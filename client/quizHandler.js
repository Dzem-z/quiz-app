import { QuizData } from "./quizData.js";
import {STYLES} from "./polygonStyles.js";
import { EventHandler } from "./eventHandler.js";
import { FunctionWithTimeout } from "./funcWithTimeout.js";
import { ResultsBanner } from "./resultsBanner.js";

const RESULT_PRINT_TIME = 2000;

export class QuizHandler extends EventHandler{


    constructor(names, control, loader) {
        super();
        this.names = new QuizData(names);
        this.control = control;
        this.loader = loader;
        this.iterator = this.names[Symbol.iterator]();
        this.toGuess = this.iterator.next().value;
        this.resetFunction = undefined;
        control.setPrompt(this.toGuess);
    }
    
    handleClick = (e) => {
        let layer = e.target
        let result = layer.feature.properties.name == this.toGuess;
        if (this.resetFunction != undefined) {
            this.resetFunction.forceExecute();
        }
        if (layer.guessed === true) {
            return;
        }

        this.showResult(layer, result);
        if (result) {

            layer.setStyle(STYLES.correctGuess);
            layer.guessed = true;
            let nextIt = this.iterator.next();
            this.toGuess = nextIt.value;
            if (nextIt.value === undefined)
                this.showSummary();
            this.control.setPrompt(this.toGuess);
        }
    }

    showSummary = () => {
        this.control.remove();
        this.banner = new ResultsBanner();
        this.loader.addToMap(this.banner);
    }

    removeBanner = () => {
        if (this.banner != undefined)
            this.banner.getContainer().remove();
    }

    showResult = (layer, result) => {

        this.control.printResult(result);
        if(result) {
            this.resetFunction = new FunctionWithTimeout(() => {
                this.control.resetAfterPrinting();
            }, RESULT_PRINT_TIME);
        }
        else {
            layer.setStyle(STYLES.wrongGuess);

            this.resetFunction = new FunctionWithTimeout(() => {
                layer.setStyle(STYLES.resetAfterGuess)
                this.control.resetAfterPrinting();
            }, RESULT_PRINT_TIME);
        }
    }
}