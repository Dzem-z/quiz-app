export let ResultsBanner = L.Control.extend({
    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'control'); 
        this.setUp();
        return this._div;
    },

    setUp: function () {
        this._div.innerHTML = "<h1>Congratulations, you've won the quiz</h1>";
    }
});