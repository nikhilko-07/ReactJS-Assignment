import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import MapPage from "./pages/MapPage";
import PhotoResult from "./pages/PhotoResult";
import ChartPage from "./pages/ChartPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/list" element={<List />} />
        <Route path="/details" element={<Details />} />
        <Route path="/photo" element={<PhotoResult />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;