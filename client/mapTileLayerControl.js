let instance;
let tileLayer;
let marker;
let map;
let isOn;

class MapTileLayerControl {
    constructor(paramMap) {
        map = paramMap;
        tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        isOn = false;
        this.turnOn();

        instance = this;
    }

    turnOn() {
        if(!isOn) {
            isOn = true;
            marker = tileLayer.addTo(map);
        }
    }

    turnOff() {
        if(isOn) {
            isOn = false;
            marker.remove()
        }
    }
}

function getInstance() {
    return instance;
}

function createOrGetInstance(paramMap) {
    if (instance) {
        return instance;
    }

    return new MapTileLayerControl(paramMap);
}

export {getInstance, createOrGetInstance}