import { DATA_FETCHER } from "./dataFetcher.js";
import { MapArea } from "./mapArea.js";
import { createAdminUnit } from "./adminUnit.js";

export class World extends MapArea {

    constructor(mapData, countries) {
        super();
        this.name = "World";
        this.mapData = mapData;
        this.countries = countries;
    }

    getNextAdminUnit = async (adminName, wikidata) => {
        let countryId = this.getCountryId(adminName);
        let divisionLevels = await DATA_FETCHER.fetchCountryDivisionLevels(countryId);
        let mapData = await DATA_FETCHER.fetchAdministratives(divisionLevels[0].level_number, adminName, wikidata)
        let nextAdminUnit = createAdminUnit(adminName, divisionLevels, mapData);
        return nextAdminUnit;
    }

    getButtonsData = function () {
        return [{name: "countries", fetcher: DATA_FETCHER.fetchCountriesGeometries}];
    }

    getCountryId = function (name) {
        let country = this.countries.filter((country) => {return country.overpass_name === name; })[0];
        return country.id;
    }
}

export let createWorld = async function () {
    let mapData = await DATA_FETCHER.fetchCountriesGeometries();
    let countries = await DATA_FETCHER.fetchCountries();
    return new World(mapData, countries);
}