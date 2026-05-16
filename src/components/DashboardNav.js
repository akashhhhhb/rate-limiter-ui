import { NavLink } from "react-router-dom";

function DashboardNav() {

    return (

        <nav className="dashboard-nav">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "dashboard-nav-link active"
                        : "dashboard-nav-link"
                }
            >
                Dashboard
            </NavLink>

            <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                    isActive
                        ? "dashboard-nav-link active"
                        : "dashboard-nav-link"
                }
            >
                Admin
            </NavLink>

            <NavLink
                to="/admin/benchmark"
                className={({ isActive }) =>
                    isActive
                        ? "dashboard-nav-link active"
                        : "dashboard-nav-link"
                }
            >
                Benchmark
            </NavLink>

        </nav>
    );
}

export default DashboardNav;
