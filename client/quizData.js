export class QuizData {
    constructor(names) {
        this.names = names;
    }

    length = () => {return this.names.length;}

    [Symbol.iterator]() {
        let names = this.names;
        return {
            next() {
                let index = Math.trunc(Math.random()*names.length);
                let elem = names.splice(index, 1)[0];
                let done = names.length === 0;
                return {value: elem, done: done};
            }
        }
    }
}