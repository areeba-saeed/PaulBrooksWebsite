import { Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import PopupAlert from "../../components/popupalert/popupAlert";

const ActionColumn = (props) => {
  const { row, selectedRows, setSelectedRows } = props;
  const checked = selectedRows.includes(row._id);

  const handleChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row._id]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== row._id)
      );
    }
  };

  return <Checkbox checked={checked} onChange={handleChange} />;
};

const AddFeatured = () => {
  const [medicines, setmedicines] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/medicines")
      .then((response) => {
        if (response.data.length > 0) {
          const filteredMedicines = response.data.filter(
            (medicine) => medicine.bannerImage !== null
          );
          setmedicines(filteredMedicines);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddSelectedRows = () => {
    if (selectedRows.length < 11) {
      axios
        .put(
          "https://paulbrooksapi.doctorsforhealth.co.uk/medicines/featured",
          { ids: selectedRows }
        )
        .then((response) => {
          console.log(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} Medicines Added`);
          setTimeout(() => {
            window.location.reload();
            setPopupshow(false);
          }, 2000);
          setSelectedRows([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert("No more than 10 featured medicines can be added");
    }
  };

  const actionColumn = [
    {
      field: "featured",
      headerName: "Feature",
      width: 100,
      renderCell: (params) => {
        return (
          <ActionColumn
            row={params.row}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      },
    },

    {
      field: "featuredBoolean",
      headerName: "Featured",
      width: 100,
      renderCell: (params) => {
        console.log(params.row);
        return (
          <div>
            {params.row.featured ? (
              <AiOutlineCheck style={{ color: "green" }} />
            ) : (
              <RxCross1 style={{ color: "red" }} />
            )}
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 100 },
    {
      field: "bannerImage",
      headerName: "Banner Image",
      width: 200,
      renderCell: (params) => {
        console.log(params.row.featured);
        return (
          <div>
            <img
              src={`https://paulbrooksapi.doctorsforhealth.co.uk/images/${params.row.bannerImage}`}
              alt={params.row.bannerImage}
              width={"150"}
              height={"40"}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      Add Featured (Max 10)
      <div
        className="deleteButton"
        style={{ width: 50, position: "absolute", top: 20, right: 50 }}
        onClick={handleAddSelectedRows}>
        Add
      </div>
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={{
              backgroundColor: "#8AFF8A",
              borderWidth: 1,
              borderColor: "#007500",
            }}>
            <PopupAlert popUpText={popUpText} />
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
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default AddFeatured;
