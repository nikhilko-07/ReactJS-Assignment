import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

function Details() {
    const location = useLocation();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const employee = location.state;

    useEffect(() => {
        if (!employee) {
            navigate("/list");
        }
    }, [employee, navigate]);

    if (!employee) return null;

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch {
            alert("Camera permission denied");
        }
    };

    const capturePhoto = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 300, 200);
        const image = canvasRef.current.toDataURL("image/png");
        navigate("/photo", { state: image });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Employee Details
                    </h2>
                    <button
                        onClick={() => navigate("/list")}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Back
                    </button>
                </div>

                {/* Employee Card */}
                <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-lg">{employee.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="font-medium text-lg">{employee.position}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">City</p>
                            <p className="font-medium text-lg">{employee.city}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Office</p>
                            <p className="font-medium text-lg">{employee.office}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="font-medium text-lg">{employee.startDate}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Salary</p>
                            <p className="font-medium text-lg">
                                ${employee.salary.toLocaleString()}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Camera Section */}
                <div className="bg-white shadow-md rounded-xl p-6 text-center">

                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Capture Employee Photo
                    </h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">

                        <video
                            ref={videoRef}
                            autoPlay
                            className="rounded-lg border shadow-sm w-full max-w-xs"
                        />

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={startCamera}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Start Camera
                            </button>

                            <button
                                onClick={capturePhoto}
                                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
                            >
                                Capture Photo
                            </button>
                        </div>

                    </div>

                    <canvas
                        ref={canvasRef}
                        width="300"
                        height="200"
                        className="hidden"
                    />
                </div>

            </div>
        </div>
    );
}

export default Details;