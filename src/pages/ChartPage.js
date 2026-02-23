import { useLocation, useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

function ChartPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return null;

    const firstTen = state.slice(0, 10);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Salary Bar Graph
                    </h2>

                    <button
                        onClick={() => navigate("/list")}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Back
                    </button>
                </div>

                {/* Chart Card */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-600 mb-4">
                        Top 10 Employees by Salary
                    </h3>

                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={firstTen}
                                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="name"
                                    interval={0}
                                    tick={{ fontSize: 12 }}
                                    angle={-40}
                                    textAnchor="end"
                                />

                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                />
                                <Bar dataKey="salary" fill="#2563eb" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChartPage;