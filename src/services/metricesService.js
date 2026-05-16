import axios from "axios";

const BASE_URL = "http://localhost:8080";


export const fetchMetrics = async () => {

    const response = await axios.get(
        `${BASE_URL}/metrics`
    );

    return response.data;
};
