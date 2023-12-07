var queries = new Map() //{query id: queryBody (URI-encoded)}

queries[-1] = encodeURIComponent(`
[bbox:49.967891, 19.723382, 50.124380, 20.093834]
[out:json]
[timeout:90]
;
area[name="Polska (ląd)"];
relation[boundary=administrative][admin_level=8][population~".*......"](area) ->.a;
way(r.a) -> .b;
.a out geom;
`)

queries[0] = encodeURIComponent(`
    [out:json]
    [timeout:90]
    ;
    area[name="Polska (ląd)"];
    relation[boundary=administrative][admin_level=4](area) -> .a;
    .a out geom;
`)

queries[2] = encodeURIComponent(`
[out:json]
[timeout:90]
;
area[name="Polska (ląd)"];
relation[boundary=administrative][admin_level=4](area) -> .a;
node(r.a: "admin_centre") -> .c;
.c out geom;
`)

queries[1] = encodeURIComponent(`
[out:json]
[timeout:90]
;
area[name="Polska (ląd)"];
relation[boundary=administrative][admin_level=4](area) -> .a;
node(r.a: "admin_centre") -> .c;
(rel(bn.c)[admin_level=8]; - .c;) -> .d;
.d out geom;
`)

module.exports = queries