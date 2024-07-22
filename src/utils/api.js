import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTMxYmEwYTAzNDI0OWMyNjIyM2E5NmE0OWZkNjIwMSIsInN1YiI6IjY1Y2JiODc2OGMzMTU5MDE2MzM4ZTlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w2K1UZS4hTng4ekpKKA2W_MBRL8hEEpfkTyyBiAcYYg";

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers: {
                Authorization: "Bearer " + TMBD_TOKEN,
            },
            params,
        });
        return data;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error; 
    }
};


