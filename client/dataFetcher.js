export class DataFetcher {

    async fetchCountriesGeometries() {
        return await fetch("http://localhost:3000/api/get_cnt_geom/1");
    }

    async fetchCountryDivisionLevels(id) {
        return await fetch("http://localhost:3000/api/levels/" + id);
    }

    async fetchCountries() {
        return await fetch("http://localhost:3000/api/countries");
    }

    async fetchAdministratives(level, area) {
        return await fetch("http://localhost:3000/api/geometry/" + level + "/1/" + area);
    }
}
