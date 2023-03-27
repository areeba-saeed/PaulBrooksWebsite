import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableDoctors from "./DatatableDoctors";

const Doctors = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableDoctors />
      </div>
    </div>
  );
};

export default Doctors;
