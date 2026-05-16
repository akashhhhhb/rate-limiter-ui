import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function MemoryChart({ data }) {

    return (

        <div className="dashboard-panel benchmark-chart">

            <h2>
                Redis Memory Usage
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                    />

                    <XAxis
                        dataKey="algorithm"
                        stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip
                        cursor={false}
                        contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#e5e7eb"
                        }}
                    />

                    <Bar
                        dataKey="redisMemoryMb"
                        fill="#f59e0b"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default MemoryChart;
