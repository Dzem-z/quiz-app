import { QuizData } from "./quizData.js";
export class QuizHandler {

    constructor(names, info) {

        this.names = new QuizData(names);
        this.info = info;
        this.iterator = this.names[Symbol.iterator]();
        this.toGuess = this.iterator.next().value;
        this.info.innerHTML = "<h4>Click " + this.toGuess + "</h4><b>Click area on the map</b>";

        info.printResult = function (result) {
            this.lastChild.innerHTML = result ? 'Correct!' : 'Wrong';
            this.lastChild.style.color = result ? 'green' : 'red';
        }

        info.printPrompt = function(prompt) {
            this.firstChild.innerHTML = prompt;
        }
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
        let result = layer.feature.properties.name == this.toGuess

        this.info.printResult(result)
        if (result) {
            let nextIt = this.iterator.next();
            this.toGuess = nextIt.value;
            if (nextIt.value === undefined)
                alert("Congratulations, you've won!");
            this.info.printPrompt("Click " + this.toGuess);
        }
    }
}