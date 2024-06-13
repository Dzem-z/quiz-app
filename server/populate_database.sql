USE quizdb;

CALL InsertCountry('Greece', 'Ελλάς', 'Q41');
SELECT id INTO @id FROM countries WHERE name='Greece' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (3,"Όρια Αυτόνομης Μοναστικής Πολιτείας Αγίου Όρους", @id, false),
    (4, "Όρια Αποκεντρωμένων Διοικήσεων", @id, false),
    (5, "Όρια Περιφερειών (NUTS 2) ", @id, false),
    (6, "Όρια Περιφερειακών ενοτήτων (NUTS 3) ", @id, false),
    (7, "Όρια Δήμων", @id, false),
    (8, "Όρια Δημοτικών ενοτήτων", @id, false),
    (9, "Όρια Δημοτικών κοινοτήτων (LAU)", @id, false);

CALL InsertCountry('Poland', 'Polska', 'Q36');
SELECT id INTO @id FROM countries WHERE name='Poland' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "województwa (voivodships, provinces, regions)", @id, true),
    (6, "powiaty (counties)", @id, false),
    (7, "gminy (municipalities)", @id, false),
    (8, "cities, towns and villages. (miasta, miasteczka i wsie).", @id, false),
    (9, "City districts (dzielnice)", @id, false),
    (10, "Przysiółki - usually isolated parts of villages.", @id, false),
    (11, "boundaries for neighborhoods (osiedla)", @id, false);

CALL InsertCountry('Portugal', 'Portugal', 'Q45');
SELECT id INTO @id FROM countries WHERE name='Portugal' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (6, "Districts (Distritos)", @id, false),
    (7, "Municipalities (Concelhos)", @id, false),
    (8, "Civil parishes (Freguesias)", @id, false);

CALL InsertCountry('Germany', 'Deutschland', 'Q183');
SELECT id INTO @id FROM countries WHERE name='Germany' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "federal states border, Bundesland (NUTS 1)", @id, false),
    (5, "state-district border, Regierungsbezirk (NUTS 2)", @id, false),
    (6, "county borders, Landkreis / Kreis / kreisfreie Stadt (NUTS 3)", @id, false),
    (7, "amt, Samtgemeinde, Verwaltungsgemeinschaft (LAU 1 (aka NUTS 4))", @id, false),
    (8, "Towns, Municipalities / City-districts, Stadt, Gemeinde (LAU 2 (aka NUTS 5))", @id, false),
    (9, "Parts of a municipality with parish councils /self_government, Stadtbezirk / Gemeindeteil mit Selbstverwaltung", @id, false),
    (10, "Parts of a municipality without ..., Stadtteil / Gemeindeteil ohne Selbstverwaltung ", @id, false),
    (11, "Neighbourhoods statistical or historical, Stadtviertel etc.", @id, false);

CALL InsertCountry('Czech Republic', 'Česko', 'Q213');
SELECT id INTO @id FROM countries WHERE name='Czech Republic' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES 
    (4, "Statistic regions (NUTS 2)", @id, false),
    (6, "Regions (kraj) (NUTS 3)", @id, false),
    (7, "Districts (okres) (LAU 1)", @id, false),
    (8, "Towns / villages (obec) (LAU 2)", @id, false),
    (10, "Cadastral places (katastrální území) ", @id, false);

CALL InsertCountry('France', 'France', 'Q142');
SELECT id INTO @id FROM countries WHERE name='France' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (3, "Territorial areas / Overseas collectivities", @id, false),
    (4, "Régions", @id, false),
    (5, "Circonscription départementale", @id, false),
    (6, "Départements", @id, false),
    (7, "Arrondissements", @id, false),
    (8, "Communes", @id, false),
    (10, "Quartiers", @id, false);

CALL InsertCountry('Belgium', 'België / Belgique / Belgien', 'Q31');
SELECT id INTO @id FROM countries WHERE name='Belgium' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (4, "Regions", @id, false),
    (6, "Provinces", @id, false),
    (7, "Administrative arrondissements", @id, false),
    (8, "Municipalities", @id, false),
    (9, "Deelgemeenten / sections", @id, false),
    (10, "Wijken / quartiers", @id, false);

CALL InsertCountry('Netherlands', 'Nederland', 'Q29999');
SELECT id INTO @id FROM countries WHERE name='Netherlands' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (3, "Countries (landen). These are Netherlands, Aruba, Curaçao and Sint Maarten", @id, false),
    (4, "Provincies", @id, false),
    (8, "Municipalities / Carribean public bodies / Districts", @id, false),
    (10, "Settlements", @id, false);

CALL InsertCountry('United Kingdom', 'United Kingdom', 'Q145');
SELECT id INTO @id FROM countries WHERE name='United Kingdom' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (4, 'England, Scotland, Wales and Northern Ireland', @id, false),
    (5, 'England: Combined Authorities', @id, false),
    (6, 'England: Two-tier non-metropolitan counties, Metropolitan counties, Unitary authorities, City of London. Scotland: council areas. Wales: principal areas/awdurdodau unedol', @id, false),
    (8, 'England only: Metropolitan districts, non-metropolitan districts, London boroughs', @id, false),
    (10, 'England: civil parishes. Scotland: community councils. Wales: communities/cymunedau', @id, false);

CALL InsertCountry('Ireland', 'Éire / Ireland', 'Q27');
SELECT id INTO @id FROM countries WHERE name='Ireland' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (5, 'Province', @id, false),
    (6, 'County', @id, false),
    (7, 'Adminstrative County, County City', @id, false),
    (8, 'Borough & Town council, Dublin Postal Districts', @id, false),
    (9, 'Electoral Division', @id, false),
    (10, 'Townland', @id, false);

CALL InsertCountry('Spain', 'España', 'Q29');
SELECT id INTO @id FROM countries WHERE name='Spain' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (4, 'Autonomous communities', @id, false),
    (6, 'Provinces', @id, false),
    (7, 'Judicial districts, comarcas (counties) and cuadrillas', @id, false),
    (8, 'Municipalities, equivalent to townships, communes', @id, false),
    (9, 'Districts (parishes)', @id, false),
    (10, 'Wards', @id, false);

CALL InsertCountry('Italy', 'Italia', 'Q38');
SELECT id INTO @id FROM countries WHERE name='Italy' LIMIT 1;
INSERT INTO administrative_levels(level_number, name, country_id, has_centre) VALUES
    (4, 'boundary of regions', @id, false),
    (6, 'boundary of provinces', @id, false),
    (7, 'mountain community / union of municipalities', @id, false),
    (8, 'boundary of municipalities', @id, false),
    (10, 'boundary of districts', @id, false);






