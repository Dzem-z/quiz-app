const SECOND_LINE = "Click area on the map";

export let QuizControl = L.Control.extend({

    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'control');
        return this._div;
    },

    setUp: function (length) {
        this._div.innerHTML = "<h4>Click <i></i></h4><span>" 
            + SECOND_LINE + "</span><br>Score: <span id=\"score\">0</span>/"
            + length + "<br>Mistakes: <span id=\"mistakes\">0</span>";
    },

    setPrompt: function (name) {
        this.getContainer().firstChild.lastChild.innerHTML = name;
    },
    
    printResult: function (result, score, mistakes) {
        this.getContainer().children[1].innerHTML = result ? 'Correct!' : 'Wrong';
        this.getContainer().children[1].style.color = result ? 'green' : 'red';
        document.getElementById("score").innerHTML = score;
        document.getElementById("mistakes").innerHTML = mistakes;
    },

    finish: function() {
        this.getContainer().firstChild.innerHTML = "Quiz solved";
        this.getContainer().children[1].innerHTML = "Congrats!!!"
    },

    resetAfterPrinting: function () {
        this.getContainer().children[1].innerHTML = SECOND_LINE;
        this.getContainer().children[1].style.color = null;
    }

});