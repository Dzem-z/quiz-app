export class AbstractButton {
    constructor(buttonData) {
        this.button = document.createElement('button');
        this.button.innerHTML = buttonData.name;

        this.button.addEventListener("click", async () => {
            let mapData = await this.fetch(buttonData.fetcher);
            if (mapData != null)
                this.load(mapData);
        });
    }

    getElement = function () {
        return this.button;
    }
}