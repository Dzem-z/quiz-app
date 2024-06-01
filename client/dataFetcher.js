import { loadingScreenDecorator } from './loadingScreenSwapper.js';

export const DATA_FETCHER = {

    fetchCountriesGeometries : loadingScreenDecorator(async () => {  
        //Wrapped in a loading screen because this call reaches a remote server and thus takes a lot of time to complete.  
        return await fetch("http://localhost:3000/api/get_cnt_geom/1").then((data) => data.json());
    }),

    async fetchCountryDivisionLevels(id) {
        return await fetch("http://localhost:3000/api/levels/" + id).then((data) => data.json());
    },

    async fetchCountries() {
        return await fetch("http://localhost:3000/api/countries").then((data) => data.json());
    },

    fetchAdministratives: loadingScreenDecorator(async (level, area) => {
        //Same as above. Reaches a remote server and thus takes a lot of time to complete.  
        return await fetch("http://localhost:3000/api/geometry/" + level + "/1/" + area).then((data) => data.json());
    })
}
