import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableSymptom from "./DatatableSymptoms";

const Symptoms = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableSymptom />
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
