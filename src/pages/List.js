import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function List() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post("https://backend.jotish.in/backend_dev/gettabledata.php", {
                username: "test",
                password: "123456",
            })
            .then((res) => {
                const tableData = res.data.TABLE_DATA.data;

                const formattedData = tableData.map((item) => ({
                    name: item[0],
                    position: item[1],
                    city: item[2],
                    office: item[3],
                    startDate: item[4],
                    salary: parseInt(item[5].replace(/[$,]/g, "")),
                }));

                setData(formattedData);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Employee List
                    </h2>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                            onClick={() => navigate("/chart", { state: data })}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                        >
                            Salary Chart
                        </button>

                        <button
                            onClick={() => navigate("/map", { state: data })}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            City Map
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Position</th>
                                <th className="px-6 py-3 font-medium">City</th>
                                <th className="px-6 py-3 font-medium text-right">Salary</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => navigate("/details", { state: item })}
                                    className="hover:bg-gray-50 cursor-pointer transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.position}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.city}
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-800">
                                        ${item.salary.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {data.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            Loading data...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default List;