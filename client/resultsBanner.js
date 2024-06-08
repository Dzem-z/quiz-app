export class ResultsBanner {
    constructor(element){
        this.element = element;
    }

    show = function (score, mistakes) {
        this.element.innerHTML = "<h1>Congratulations, you solved the quiz 😊</h1><h3>You made " + mistakes + " mistakes";
        this.element.classList.add("control");
    }

    remove = function () {
        this.element.innerHTML = "";
        this.element.classList.remove("control");
    }
}
