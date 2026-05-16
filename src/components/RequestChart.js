import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RequestChart({ data }) {

    return (

        <div className="dashboard-panel request-chart">

            <h2>
                Requests Per Update
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <CartesianGrid
                        stroke="#334155"
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        tick={{ fill: "#94a3b8" }}
                    />

                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: "#94a3b8" }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#e5e7eb"
                        }}
                        labelStyle={{
                            color: "#f8fafc"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="blocked"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default RequestChart;
