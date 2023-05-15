import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFeatured from "./AddFeatured";

const DatatableFeatured = () => {
  const [medicines, setmedicines] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/medicines")
      .then((response) => {
        const featuredMedicines = response.data.filter(
          (medicine) => medicine.featured === true
        );

        const convertedFeaturedMedicines = featuredMedicines.map(
          (medicine) => ({
            ...medicine,
            featuredAt: new Date(medicine.featuredAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            ),
          })
        );

        setmedicines(convertedFeaturedMedicines);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const actionColumn = [
    { field: "medicineId", headerName: "Medicine Id", width: 150 },
    { field: "name", headerName: "Medicine Name", width: 300 },
    {
      field: "featuredAt",
      headerName: "Fetured Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => {
                setSelectedRow(params.row);
                setOpenModal(true);
              }}>
              View
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Featured
        <div
          className="deleteButton"
          style={{ padding: 3 }}
          onClick={() => setOpenAddModal(true)}>
          Add Featured
        </div>
      </div>

      {openModal ? (
        <div className="modal">
          <div className="modalInnerMedicine">
            <p className="closeModal" onClick={() => setOpenModal(false)}>
              &times;
            </p>
            <div style={{ margin: 40 }}>
              <p className="modalText">
                <span>Medicine Id:</span>
                <span> {selectedRow.medicineId}</span>
              </p>
              <p className="modalText">
                <span>FeaturedAt:</span>
                <span> {selectedRow.featuredAt}</span>
              </p>
              <p className="modalText">
                <span>Medicine Name:</span>
                <span> {selectedRow.name}</span>
              </p>
              <p className="modalText">
                <span>Category:</span>
                <span> {selectedRow.category}</span>
              </p>
              <h5>Description: </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(selectedRow.description),
                }}></div>
              <h5>Benefits: </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(selectedRow.benefits),
                }}></div>{" "}
              <h5>Side Effects: </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(selectedRow.sideeffects),
                }}></div>{" "}
              <h5>Instructions: </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(selectedRow.instructions),
                }}></div>{" "}
              <h5>Symptoms: </h5>
              <div style={{ display: "flex" }}>
                {"{"}
                {selectedRow.symptoms.map((row) => row.name).join(", ")}
                {"}"}
              </div>
              <h5>Directions: </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(selectedRow.directions),
                }}></div>
              <h5>Ingredients: </h5>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "black", fontWeight: "bold" }}>Name</p>
                <p style={{ color: "black", fontWeight: "bold" }}>Dosage</p>
              </div>
              {selectedRow.ingredients.map((row, index) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={index}>
                  <p className="modalText">{row.ingredientName}</p>
                  <p className="modalText">
                    {row.weightage} <span>{row.measurement}</span>
                  </p>
                </div>
              ))}
              <h5 className="modalText" style={{ textAlign: "center" }}>
                Medicine Images:
              </h5>
              <div className="bannerImage">
                {selectedRow.images.map((row, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={`https://paulbrooksapi.doctorsforhealth.co.uk/images//${row}`}
                        alt={row}
                        width={"100"}
                        height={"100"}
                      />
                    </div>
                  );
                })}
              </div>
              <h5 className="modalText" style={{ textAlign: "center" }}>
                Medicine Banner Image:
              </h5>
              <div className="bannerImage">
                <img
                  src={`https://paulbrooksapi.doctorsforhealth.co.uk/images/${selectedRow.bannerImage}`}
                  alt={selectedRow.bannerImage}
                  width={"300"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {openAddModal ? (
        <div className="modal">
          <div className="modalInnerMedicine">
            <p
              className="closeModal"
              onClick={() => {
                setOpenAddModal(false);
              }}>
              X
            </p>
            <div style={{ margin: 40 }}>
              <AddFeatured />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

    
      <DataGrid
        className="datagrid"
        rows={medicines}
        columns={actionColumn}
        getRowId={(row) => {
          return row._id;
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DatatableFeatured;
