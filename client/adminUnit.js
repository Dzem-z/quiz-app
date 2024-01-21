import { DATA_FETCHER } from "./dataFetcher.js";
import { MapArea } from "./mapArea.js";

export class AdminUnit extends MapArea {

    constructor(adminName, divisionLevels, mapData) {
        super();
        this.name = adminName;
        this.divisionLevels = divisionLevels;
        this.mapData = mapData;
    }

    getNextAdminUnit = async (adminName) => {

        let mapData = {features: []};
        let divisionLevels = this.divisionLevels;
        alert(adminName);

        while (mapData.features.length == 0) {
            if (divisionLevels.length <= 1) {
                return null;
            }
            let nextLevelNumber = divisionLevels[1].level_number;
            mapData = await DATA_FETCHER.fetchAdministratives(nextLevelNumber, adminName);
            divisionLevels.splice(0,1);
        }

        return new AdminUnit(adminName, divisionLevels, mapData);
    }

    getButtonsData = function () {
        return this.divisionLevels.map((level) => {
            return { 
                name: level.name,
                fetcher: () => {
                    return DATA_FETCHER.fetchAdministratives(level.level_number, this.name);
                }
            }
        });
    }
}

export let createAdminUnit = function (adminName, divisionLevels, mapData) {
    return new AdminUnit(adminName, divisionLevels, mapData);
}