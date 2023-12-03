var quizzes = [
    //{quizName: id}
    {"wojewodztwa": 1},
    {"Duze miasta": 2},
]

var queries = new Map() //{query id: queryBody (URI-encoded)}

queries[1] = "data="+ encodeURIComponent(`
[bbox:49.967891, 19.723382, 50.124380, 20.093834]
[out:json]
[timeout:90]
;
area[name="Polska (ląd)"];
relation[boundary=administrative][admin_level=8][population~".*......"](area) ->.a;
.a out;
`)

module.exports = {
    getQuizzes : function() {
        return quizzes;
    },

    getURIbyId: function(id) {
        return queries[id];
    }
}
