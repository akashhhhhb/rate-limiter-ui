import {
    useEffect,
    useState
} from "react";

import {
    getBenchmarkResults,
    runBenchmark
} from "../services/benchmarkService";

import BenchmarkTable
    from "../components/BenchmarkTable";

import LatencyChart
    from "../components/LatencyChart";

import ThroughputChart
    from "../components/ThroughputChart";

import MemoryChart
    from "../components/MemoryChart";

import DashboardNav
    from "../components/DashboardNav";

import "./Dashboard.css";

function BenchmarkDashboard() {

    const [results, setResults] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [form, setForm] =
        useState({

            algorithm: "TOKEN_BUCKET",

            threads: 100,

            loops: 20,

            durationSeconds: 60
        });


    // =========================
    // LOAD RESULTS
    // =========================

    const loadResults = async () => {

        try {

            const data =
                await getBenchmarkResults();

            setResults(data);

        } catch (e) {

            console.error(e);
        }
    };


    useEffect(() => {

        loadResults();

    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value
        });
    };


    // =========================
    // RUN BENCHMARK
    // =========================

    const handleRunBenchmark =
        async () => {

            try {

                setLoading(true);

                setError("");

                await runBenchmark({
                    algorithm: form.algorithm,
                    threads: Number(form.threads),
                    loops: Number(form.loops),
                    durationSeconds:
                        Number(form.durationSeconds)
                });

                await loadResults();

            } catch (e) {

                console.error(e);

                setError(
                    e.response?.data?.message ||
                    e.message ||
                    "Unable to run benchmark."
                );

            } finally {

                setLoading(false);
            }
        };


    return (

        <div className="dashboard-container admin-dashboard">

            <DashboardNav />

            <h1>
                Benchmark Dashboard
            </h1>


            {/* RUN BENCHMARK */}

            <div className="dashboard-panel admin-panel">

                <h2>
                    Run Benchmark
                </h2>

                <div className="admin-form">

                    <select
                        name="algorithm"
                        value={form.algorithm}
                        onChange={handleChange}
                    >

                        <option value="TOKEN_BUCKET">
                            TOKEN_BUCKET
                        </option>

                        <option value="FIXED_WINDOW">
                            FIXED_WINDOW
                        </option>

                        <option value="SLIDING_WINDOW_LOG">
                            SLIDING_WINDOW_LOG
                        </option>

                        <option value="SLIDING_WINDOW_COUNTER">
                            SLIDING_WINDOW_COUNTER
                        </option>

                        <option value="LEAKY_BUCKET">
                            LEAKY_BUCKET
                        </option>

                    </select>


                    <input
                        type="number"
                        name="threads"
                        min="1"
                        placeholder="Threads"
                        value={form.threads}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="loops"
                        min="1"
                        placeholder="Loops"
                        value={form.loops}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="durationSeconds"
                        min="1"
                        placeholder="Duration Seconds"
                        value={form.durationSeconds}
                        onChange={handleChange}
                    />


                    <button
                        className="admin-primary-button"
                        onClick={handleRunBenchmark}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Running..."
                                : "Run Benchmark"
                        }

                    </button>

                </div>

                {
                    error && (

                        <div className="admin-message admin-error">
                            {error}
                        </div>
                    )
                }

            </div>


            {/* TABLE */}

            <BenchmarkTable
                results={results}
            />


            {/* CHARTS */}

            <LatencyChart
                data={results}
            />

            <ThroughputChart
                data={results}
            />

            <MemoryChart
                data={results}
            />

        </div>
    );
}

export default BenchmarkDashboard;
