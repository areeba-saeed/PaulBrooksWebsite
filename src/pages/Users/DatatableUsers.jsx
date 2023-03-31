import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableUsers = () => {
  const [users, setUsers] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const users = response.data.filter((user) => user.doctor === false);
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/users/" + id).then((response) => {
      console.log(response.data);
    });
    setUsers(users.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("User Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios.delete("http://localhost:5000/users/" + row).then((response) => {
        setUsers(response.data);
        setPopupshow(true);
        setPopupText(`${selectedRows.length} Users Deleted`);
      });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/*            <Link
              to={`/users/update/${params.id}`}
              state={{ data: params.row }}
              style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
        </Link> */}
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
      <div className="datatableTitle">Users</div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={
              popUpShow && popUpText === "Category Added"
                ? {
                    backgroundColor: "#8AFF8A",
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
        rows={users}
        columns={userColumns.concat(actionColumn)}
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

export default DatatableUsers;
