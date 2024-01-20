export const DATA_FETCHER = {

    async fetchCountriesGeometries() {
        return await fetch("http://localhost:3000/api/get_cnt_geom/1").then((data) => data.json());
    },

    async fetchCountryDivisionLevels(id) {
        return await fetch("http://localhost:3000/api/levels/" + id).then((data) => data.json());
    },

    async fetchCountries() {
        return await fetch("http://localhost:3000/api/countries").then((data) => data.json());
    },

    async fetchAdministratives(level, area) {
        return await fetch("http://localhost:3000/api/geometry/" + level + "/1/" + area).then((data) => data.json());
    }
}
