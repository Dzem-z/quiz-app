class LoadingScreenSwapper {
    
    constructor() {
        this.leafletElement = document.getElementById("map");
        this.loadingElement = document.getElementById("loadingScreen")
        this.loadingTextElement = document.getElementById("loadingText")
        this.dots = 1
        this.maxDots = 3
        this.interval = null
    }

    updateLoadingScreen() {
        this.incrementDots();
        this.loadingTextElement.innerHTML = "Loading" + ".".repeat(this.dots);
    }

    incrementDots() {
        this.dots = (this.dots % this.maxDots) + 1;
    }

    startLoad() {
        this.loadingElement.style.display = "block";
        this.leafletElement.style.display = "none";
        this.interval = setInterval(() => {loadingScreenSwapper.updateLoadingScreen()},500);
    }

    endLoad() {
        this.loadingElement.style.display = "none";
        this.leafletElement.style.display = "block";
        clearInterval(this.interval);
    }
    

}

export const loadingScreenSwapper = new LoadingScreenSwapper();