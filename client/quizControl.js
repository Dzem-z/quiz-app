export let QuizControl = L.Control.extend({

    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.setUp();
        return this._div;
    },

    setUp: function () {
        this._div.innerHTML = "<h4>Click <i></i></h4><span>Click area on the map</span>";
    },

    setPrompt: function (name) {
        this.getContainer().firstChild.lastChild.innerHTML = name;
    },
    
    printResult: function (result) {
        this.getContainer().lastChild.innerHTML = result ? 'Correct!' : 'Wrong';
        this.getContainer().lastChild.style.color = result ? 'green' : 'red';
    }

});

L.QuizControl = function () {
    return new QuizControl();
}