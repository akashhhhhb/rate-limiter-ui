import './App.css';
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BenchmarkDashboard from "./pages/BenchmarkDashboard";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
  return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/benchmark"
                    element={<BenchmarkDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );

}

export default App;
