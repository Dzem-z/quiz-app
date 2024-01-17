export class QuizFetcher {
    async fetchQuiz() {
        let voivodeships = await fetch("http://localhost:3000/api/geometry/4/100/Polska (ląd)");
        return voivodeships;
    }
}
