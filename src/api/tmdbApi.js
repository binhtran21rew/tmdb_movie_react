import axiosClient from "./axiosClient";

const tmdbApi = {
    createRequestToken: () => {
        const url = 'authentication/token/new';
        return axiosClient.get(url, {params: {}});
    },
    search: (params) => {
        const url = 'search/movie';
        return axiosClient.get(url, params);
    },
    detail: (id, params) => {
        const url = 'movie/' + id;
        return axiosClient.get(url, {params:{}});
    }
}

export default tmdbApi;