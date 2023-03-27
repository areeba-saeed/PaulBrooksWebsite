import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { symptomColumns } from "../../datatablesource";

const DatatableSymptom = () => {
  const [symptoms, setsymptoms] = useState([]);
  const [SymptomName, setSymptomName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptoms")
      .then((response) => {
        if (response.data.length > 0) {
          setsymptoms(response.data);
          setSymptomName(response.data[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const Symptom = {
      name: SymptomName,
    };

    axios
      .post("http://localhost:5000/symptoms", Symptom)
      .then((res) => {
        console.log(res.data);
        setsymptoms(res.data);
        setPopupText(`Symptom Added`);
        setSymptomName("");
        setPopupshow(true);
        setOpenModal(false);
        setErrorMessage(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(true);
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/symptoms/" + id).then((response) => {
      console.log(response.data);
    });
    setsymptoms(symptoms.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Symptom Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios.delete("http://localhost:5000/symptoms/" + row).then((response) => {
        setsymptoms(response.data);
        setPopupshow(true);
        setPopupText(`${selectedRows.length} Symptom Deleted`);
      });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const serialNoColumn = [
    {
      field: "serial",
      headerName: "S NO.",
      width: 100,
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Symptoms
        <div
          className="link-new"
          onClick={() => {
            setOpenModal(true);
            setSymptomName("");
          }}>
          Add Symptom
        </div>
      </div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {openModal ? (
        <div className="modal">
          <div className="modalInner">
            <p
              className="closeModal"
              onClick={() => {
                setOpenModal(false);
                setErrorMessage(false);
              }}>
              X
            </p>
            <div style={{ margin: 40 }}>
              {errorMessage ? (
                <div style={{ color: "red", fontSize: 10 }}>
                  Symptom already exist
                </div>
              ) : (
                ""
              )}
              <form className="category-new" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Symptom Name"
                  className="category-form"
                  value={SymptomName}
                  onChange={(e) => {
                    setSymptomName(e.target.value);
                  }}
                />

                <button className="createButton">Add</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={
              popUpShow && popUpText === "Symptom Added"
                ? {
                    backgroundColor: "green",
                    borderWidth: 1,
                    borderColor: "#007500",
                  }
                : { backgroundColor: "red", borderWidth: 1, borderColor: "red" }
            }>
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}

      <DataGrid
        className="datagrid"
        rows={symptoms}
        columns={serialNoColumn.concat(symptomColumns).concat(actionColumn)}
        checkboxSelection={true}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        getRowId={(row) => {
          return row._id;
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DatatableSymptom;
