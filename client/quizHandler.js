import { QuizData } from "./quizData.js";
import {STYLES} from "./polygonStyles.js";
import { EventHandler } from "./eventHandler.js";
import { FunctionWithTimeout } from "./funcWithTimeout.js";
import { QuizControl } from "./quizControl.js";
import { ResultsBanner } from "./resultsBanner.js";

const RESULT_PRINT_TIME = 2000;

export class QuizHandler extends EventHandler{


    constructor(names, loader) {
        super();
        this.names = new QuizData(names);
        this.control = new QuizControl();
        loader.addToMap(this.control);
        this.loader = loader;
        this.iterator = this.names[Symbol.iterator]();
        this.toGuess = this.iterator.next().value;
        this.resetFunction = undefined;
        this.banner = new ResultsBanner(document.getElementById("results"));
        this.score = 0;
        this.mistakes = 0;
        this.control.setUp(this.names.length()+1);
        this.control.setPrompt(this.toGuess);
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

        if (result) {
            
            this.score++;
            layer.setStyle(STYLES.correctGuess);
            layer.guessed = true;
            let nextIt = this.iterator.next();
            this.toGuess = nextIt.value;
            this.control.setPrompt(this.toGuess);
        }
        else {
            this.mistakes++;
        }
        this.showResult(layer, result);
        if (this.toGuess === undefined)
            this.showSummary();
    }

    showSummary = () => {
        if (this.resetFunction != undefined) {
            this.resetFunction.forceExecute();
            this.resetFunction = undefined;
        }
        this.control.finish();
        this.banner.show(this.score, this.mistakes);
    }

    removeBanner = () => {
        if (this.banner != undefined) {
            this.banner.remove();  
        }
    }

    showResult = (layer, result) => {

        this.control.printResult(result, this.score, this.mistakes);
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