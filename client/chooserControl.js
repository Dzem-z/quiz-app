export let ChooserControl = L.Control.extend({
    
    onAdd: function (map) {
        this._div = L.DomUtil.create('div', 'control');
        this.setUp();
        return this._div;
    },

    setUp: function () {
        this._div.innerHTML = `<h4></h4>
                                Choose quiz<br>
                                or click an area on the map<br>
                                to have a quiz from there`;
    },

    setLoader: function (loader) {
        this.loader = loader;
    },

    setName: function (name) {
        this.getContainer().firstChild.innerHTML = name;
    },

    loadButtons: function (buttonsData) {
        for(let level of buttonsData) {
            let button = document.createElement('button');
            let br = document.createElement('br');
            button.innerHTML = level.name;
            button.addEventListener("click", async () => {
                let mapData = await level.fetcher();
                if (mapData.features.length == 0) {
                    alert(`No areas of this type here!
                        Pick another quiz`);
                        return;
                }
                this.getContainer().remove();
                this.loader.loadQuiz(mapData);
            })
            let index = this.getContainer().childElementCount-2;
            this.getContainer().children[index].after(button);
            this.getContainer().children[index+1].after(br);
        }
    },

    removeButtons: function () {
        let buttons = this.getContainer().getElementsByTagName('button');
        buttons = Array.from(buttons);
        for(let button of buttons) {
            button.nextElementSibling.remove();
            button.remove();
        }
    }
});