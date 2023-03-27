import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableFeatured from "./DatatableFeatured";

const Featured = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableFeatured />
        </div>
      </div>
    </div>
  );
};

export default Featured;
