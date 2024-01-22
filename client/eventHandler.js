import {STYLES} from "./polygonStyles.js";

export class EventHandler {

    highlightFeature = (e) => {
        let layer = e.target;
        layer.setStyle(STYLES.hovered);
        layer.bringToFront();
    }
    
    resetHighlight = (e) => {
        let layer = e.target
        layer.setStyle(STYLES.unhovered);
    }

    removeControl = () => {
        if (this.control != undefined)
            this.control.getContainer().remove();
    }

    removeBanner = () => {}
}