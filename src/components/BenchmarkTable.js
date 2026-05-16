function BenchmarkTable({
    results
}) {

    return (

        <div className="dashboard-panel admin-panel">

            <h2>
                Benchmark Results
            </h2>

            <div className="admin-table-wrap">

                <table className="admin-table">

                    <thead>

                    <tr>

                        <th>Algorithm</th>

                        <th>Avg Latency</th>

                        <th>P95</th>

                        <th>Throughput</th>

                        <th>Memory</th>

                        <th>Blocked %</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        results.map((r, index) => (

                            <tr key={index}>

                                <td>{r.algorithm}</td>

                                <td>
                                    {r.avgLatency} ms
                                </td>

                                <td>
                                    {r.p95Latency} ms
                                </td>

                                <td>
                                    {r.throughput}
                                </td>

                                <td>
                                    {r.redisMemoryMb} MB
                                </td>

                                <td>
                                    {r.blockedPercentage}%
                                </td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BenchmarkTable;
