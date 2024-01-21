export class FunctionWithTimeout {

    constructor(fn, timer) {
        this.func = fn;
        this.timerId = setTimeout(this.func, timer);
    }

    clear = function () {
        clearTimeout(this.timerId);
    }

    forceExecute = function() {
        this.clear();
        this.func();
    }
}