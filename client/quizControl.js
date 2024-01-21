import { FunctionWithTimeout } from "./funcWithTimeout.js";

const SECOND_LINE = "Click area on the map";

export let QuizControl = L.Control.extend({

    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.setUp();
        return this._div;
    },

    setUp: function () {
        this._div.innerHTML = "<h4>Click <i></i></h4><span>" + SECOND_LINE + "</span>";
        this.timeoutFunc = undefined;
    },

    setPrompt: function (name) {
        this.getContainer().firstChild.lastChild.innerHTML = name;
    },
    
    printResult: function (result, time) {
        this.getContainer().lastChild.innerHTML = result ? 'Correct!' : 'Wrong';
        this.getContainer().lastChild.style.color = result ? 'green' : 'red';
    },

    resetAfterPrinting: function () {
        this.getContainer().lastChild.innerHTML = SECOND_LINE;
        this.getContainer().lastChild.style.color = null;
    }

});

L.QuizControl = function () {
    return new QuizControl();
}