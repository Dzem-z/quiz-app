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
    
};

function loadingScreenDecorator(func) {
    const loadingScreen = new LoadingScreenSwapper();
    return async function(...args) {
        loadingScreen.startLoad();
        let result;
        try {
            result = await func(...args);
        } catch (error) {
            loadingScreen.endLoad();
            throw error;
        }
        
        loadingScreen.endLoad();

        return result;
    }
}

export {loadingScreenDecorator}