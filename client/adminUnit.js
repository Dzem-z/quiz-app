import { DATA_FETCHER } from "./dataFetcher.js";
import { MapArea } from "./mapArea.js";

export class AdminUnit extends MapArea {

    constructor(adminName, divisionLevels, mapData, wikidata) {
        super();
        this.name = adminName;
        this.divisionLevels = divisionLevels;
        this.mapData = mapData;
        this.wikidata = wikidata;
    }

    getNextAdminUnit = async (adminName, wikidata) => {

        let mapData = {features: []};
        let divisionLevels = this.divisionLevels;

        while (mapData.features.length == 0) {
            if (divisionLevels.length <= 1) {
                return null;
            }
            let nextLevelNumber = divisionLevels[1].level_number;
            mapData = await DATA_FETCHER.fetchAdministratives(nextLevelNumber, adminName, wikidata);
            divisionLevels.splice(0,1);
        }

        return new AdminUnit(adminName, divisionLevels, mapData, wikidata);
    }

    getButtonsData = function () {
        return this.divisionLevels.map((level) => {
            return { 
                name: level.name,
                fetcher: () => {
                    return DATA_FETCHER.fetchAdministratives(level.level_number, this.name, this.wikidata);
                }
            }
        });
    }
}

export let createAdminUnit = function (adminName, divisionLevels, mapData) {
    return new AdminUnit(adminName, divisionLevels, mapData);
}