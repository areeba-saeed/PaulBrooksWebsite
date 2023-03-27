import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableMedicines from "./DatatableMedicines";

const Medicines = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableMedicines />
      </div>
    </div>
  );
};

export default Medicines;
