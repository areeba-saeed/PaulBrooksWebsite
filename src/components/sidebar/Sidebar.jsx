import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CategoryIcon from "@mui/icons-material/Category";
import MedicationIcon from "@mui/icons-material/Medication";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">E-commerce</span>
        </Link>
      </div>
      <hr className="break-sidebar" />
      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/symptoms" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Symptoms</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/genres" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Genres</span>
            </li>
          </Link>
          <Link to="/medicines" style={{ textDecoration: "none" }}>
            <li>
              <MedicationIcon className="icon" />
              <span>Medicines</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/doctors" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Doctors</span>
            </li>
          </Link>
          <Link to="/featured" style={{ textDecoration: "none" }}>
            <li>
              <MedicationIcon className="icon" />
              <span>Featured Medicines</span>
            </li>
          </Link>
          <Link to="/update" style={{ textDecoration: "none" }}>
            <li>
              <MedicationIcon className="icon" />
              <span>Update Admin</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
