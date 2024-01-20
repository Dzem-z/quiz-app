import { QuizData } from "./quizData.js";
import {STYLES} from "./polygonStyles.js";
import { EventHandler } from "./eventHandler.js";

export class QuizHandler extends EventHandler{

    constructor(names, control) {
        super();
        this.names = new QuizData(names);
        this.control = control;
        this.iterator = this.names[Symbol.iterator]();
        this.toGuess = this.iterator.next().value;
        control.setPrompt(this.toGuess);
    }
    
    handleClick = (e) => {
        let layer = e.target
        let result = layer.feature.properties.name == this.toGuess

        this.control.printResult(result)
        if (result) {
            let nextIt = this.iterator.next();
            this.toGuess = nextIt.value;
            if (nextIt.value === undefined)
                alert("Congratulations, you've won!");
            this.control.setPrompt(this.toGuess);
        }
    }
}