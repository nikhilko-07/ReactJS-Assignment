import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


function MapPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    if (!state) return null;

    // City coordinates
    const cityCoords = {
        Edinburgh: [55.9533, -3.1883],
        Tokyo: [35.6762, 139.6503],
        "San Francisco": [37.7749, -122.4194],
        London: [51.5072, -0.1276],
        "New York": [40.7128, -74.006],
        Singapore: [1.3521, 103.8198],
        Sidney: [-33.8688, 151.2093],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Employee Cities Map
                    </h2>

                    <button
                        onClick={() => navigate("/list")}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Back
                    </button>
                </div>

                {/* Map Card */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="h-[500px] md:h-[600px] w-full rounded-lg overflow-hidden">
                        <MapContainer
                            center={[20, 0]}
                            zoom={2}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {state.map((employee, index) => {
                                const coords = cityCoords[employee.city];
                                if (!coords) return null;

                                return (
                                    <Marker key={index} position={coords}>
                                        <Popup>
                                            <div className="text-sm">
                                                <strong>{employee.name}</strong>
                                                <br />
                                                {employee.city}
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MapPage;