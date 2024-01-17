import { QuizData } from "./quiz_data.js";
export class QuizHandler {

    constructor(names, info) {

        this.names = new QuizData(names);
        this.info = info;
        this.iterator = this.names[Symbol.iterator]();
        this.toGuess = this.iterator.next().value;
        this.info.printPrompt("Click " + this.toGuess);
        let text = document.createElement('b');
        text.innerHTML = "Click area on a map";
        this.info.getContainer().append(text);
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
    
    handleClick = (e) => {
        let layer = e.target
        let result = layer.feature.properties.name === this.toGuess
        this.info.printResult(result)
        if (result) {
            let nextIt = this.iterator.next();
            this.toGuess = nextIt.value;
            this.info.printPrompt("Click " + this.toGuess);
            if (nextIt.done)
                alert("Congratulations, you've won!");
        }
    }
}