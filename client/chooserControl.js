export let ChooserControl = L.Control.extend({
    
    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'control');
        this.setUp();
        return this._div;
    },

    setUp: function () {
        this._div.innerHTML = "<h4>Click <i></i></h4><span>" + SECOND_LINE + "</span>";
    },

    addButtons() {

    },

    removeButtons() {

    }
});

L.ChooserControl = function () {
    return new ChooserControl();
}