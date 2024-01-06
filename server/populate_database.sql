USE quizdb;

CALL InsertCountry('Greece', 'Ελλάς');
SELECT id INTO @id FROM countries WHERE name='Greece' LIMIT 1;  --administrative centers: unknown
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (3,"Όρια Αυτόνομης Μοναστικής Πολιτείας Αγίου Όρους", @id, false),
    (4, "Όρια Αποκεντρωμένων Διοικήσεων", @id, false),
    (5, "Όρια Περιφερειών (NUTS 2) ", @id, false),
    (6, "Όρια Περιφερειακών ενοτήτων (NUTS 3) ", @id, false),
    (7, "Όρια Δήμων", @id, false),
    (8, "Όρια Δημοτικών ενοτήτων", @id, false),
    (9, "Όρια Δημοτικών κοινοτήτων (LAU)", @id, false);

CALL InsertCountry('Poland', 'Polska (ląd)');
SELECT id INTO @id FROM countries WHERE name='Poland' LIMIT 1;  --administrative centers: known
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "województwa (voivodships, provinces, regions)", @id, true),
    (6, "powiaty (counties)", @id, false),
    (7, "gminy (municipalities)", @id, false),
    (8, "cities, towns and villages. (miasta, miasteczka i wsie).", @id, false),
    (9, "City districts (dzielnice)", @id, false),
    (10, "Przysiółki - usually isolated parts of villages.", @id, false),
    (11, "boundaries for neighborhoods (osiedla)", @id, false);

CALL InsertCountry('Portugal', 'Portugal');
SELECT id INTO @id FROM countries WHERE name='Portugal' LIMIT 1; --administrative centers: unknown
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "Autonomous Regions (Regiões autónomas)", @id, true),
    (6, "Districts (Distritos)", @id, false),
    (7, "Municipalities (Concelhos)", @id, false),
    (8, "Civil parishes (Freguesias)", @id, false);

CALL InsertCountry('Germany', 'Deutschland');
SELECT id INTO @id FROM countries WHERE name='Germany' LIMIT 1; --administrative centers: unknown
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "federal states border, Bundesland (NUTS 1)", @id, false),
    (5, "state-district border, Regierungsbezirk (NUTS 2)", @id, false),
    (6, "county borders, Landkreis / Kreis / kreisfreie Stadt (NUTS 3)", @id, false),
    (7, "amt, Samtgemeinde, Verwaltungsgemeinschaft (LAU 1 (aka NUTS 4))", @id, false),
    (8, "Towns, Municipalities / City-districts, Stadt, Gemeinde (LAU 2 (aka NUTS 5))", @id, false),
    (9, "Parts of a municipality with parish councils /self_government, Stadtbezirk / Gemeindeteil mit Selbstverwaltung", @id, false),
    (10, "Parts of a municipality without ..., Stadtteil / Gemeindeteil ohne Selbstverwaltung ", @id, false),
    (11, "Neighbourhoods statistical or historical, Stadtviertel etc.", @id, false);

CALL InsertCountry('Czech Republic', 'Česko');
SELECT id INTO @id FROM countries WHERE name='Czech Republic' LIMIT 1; --administrative centers: unknown
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "Statistic regions (NUTS 2)", @id, false),
    (6, "Regions (kraj) (NUTS 3)", @id, false),
    (7, "Districts (okres) (LAU 1)", @id, false),
    (8, "Towns / villages (obec) (LAU 2)", @id, false),
    (10, "Cadastral places (katastrální území) ", @id, false);
