class LoadingScreenSwapper {
    
    constructor() {
        this.loadingElement = document.getElementById("loadingScreen")
    }

    startLoad() {
        this.loadingElement.style.display = "block";
    }

    endLoad() {
        this.loadingElement.style.display = "none";
    }
    
}

export const loadingScreenSwapper = new LoadingScreenSwapper();