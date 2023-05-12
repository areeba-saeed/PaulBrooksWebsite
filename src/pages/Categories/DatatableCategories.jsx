import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableCategories = () => {
  const [categories, setcategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setcategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete("https://paulbrooksapi.doctorsforhealth.co.uk/categories/" + id).then((response) => {
      console.log(response.data);
    });

    setcategories(categories.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Category Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete("https://paulbrooksapi.doctorsforhealth.co.uk/categories/" + row)
        .then((response) => {
          setcategories(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} categories Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    { field: "name", headerName: "Category Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 300,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setSelectedRow(params.row);
              console.log(params.row);
              setOpenModal(true);
            }}>
            <img
              src={`https://paulbrooksapi.doctorsforhealth.co.uk/categories/${params.row.image}`}
              width={"40"}
              height={"40"}
              className="imageInCategory"
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/categories/update/${params.id}`}
              style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
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
        Categories
        <Link to="/categories/new" className="link-new">
          Add Category
        </Link>
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
            <p className="closeModal" onClick={() => setOpenModal(false)}>
              &times;
            </p>
            <div style={{ margin: 40 }}>
              <img
                src={`https://paulbrooksapi.doctorsforhealth.co.uk/categories/${selectedRow.image}`}
                width={"400"}
                height={"400"}
              />
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
            style={{
              backgroundColor: "red",
              borderWidth: 1,
              borderColor: "red",
            }}>
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}
      <DataGrid
        className="datagrid"
        rows={categories}
        columns={actionColumn}
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

export default DatatableCategories;
