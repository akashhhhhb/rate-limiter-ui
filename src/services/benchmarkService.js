import axios from "axios";

const BASE_URL =
    "http://localhost:8080";


// =========================
// GET BENCHMARK RESULTS
// =========================

export const getBenchmarkResults =
    async () => {

        const response =
            await axios.get(

                `${BASE_URL}/benchmark/compare`
            );

        return response.data;
    };


// =========================
// RUN BENCHMARK
// =========================

export const runBenchmark =
    async (payload) => {

        const response =
            await axios.post(

                `${BASE_URL}/benchmark/run`,

                payload
            );

        return response.data;
    };