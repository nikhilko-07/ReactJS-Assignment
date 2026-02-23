import { useLocation, useNavigate } from "react-router-dom";

function PhotoResult() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return null;

    const downloadImage = () => {
        const link = document.createElement("a");
        link.href = state;
        link.download = "employee-photo.png";
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-xl p-8 max-w-lg w-full text-center">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Captured Photo
                </h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={state}
                        alt="Captured"
                        className="rounded-lg shadow-md max-h-96 w-auto object-contain"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/details")}
                        className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={downloadImage}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Download
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PhotoResult;