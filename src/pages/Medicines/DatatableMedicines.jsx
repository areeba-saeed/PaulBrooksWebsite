import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableMedicines = () => {
  const [medicines, setmedicines] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [images, setImage] = useState([]);
  const [openImageModal, setImageModal] = useState(false);
  const [updatedImages, setUpdatedImage] = useState([]);
  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/medicines")
      .then((response) => {
        if (response.data.length > 0) {
          setmedicines(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        "https://paulbrooksapi.doctorsforhealth.co.uk/medicines/delete/" + id
      )
      .then((response) => {
        console.log(response.data);
        setmedicines(medicines.filter((el) => el._id !== id));
      });

    setPopupshow(true);
    setPopupText("Category Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete(
          "https://paulbrooksapi.doctorsforhealth.co.uk/medicines/delete/" + row
        )
        .then((response) => {
          window.location.reload();
          setPopupshow(true);
          setPopupText(`${selectedRows.length} Medicines Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });
    if (images.length + updatedImages.length < 6) {
      axios
        .patch(
          `https://paulbrooksapi.doctorsforhealth.co.uk/medicines/addImage/${selectedRow._id}`,
          formData
        )
        .then((response) => {
          setUpdatedImage(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        setPopupshow(false);
      }, 2000);
    } else {
      window.alert("No maximum 5 imaegs allowed");
    }
  };

  const handleDeleteImage = (index) => {
    axios
      .delete(
        `https://paulbrooksapi.doctorsforhealth.co.uk/medicines/deleteImage/${selectedRow._id}/${index}`
      )
      .then((response) => {
        setUpdatedImage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    const uniqueImages = selectedImages.filter(
      (image, index, self) =>
        index ===
        self.findIndex((t) => t.name === image.name && t.size === image.size)
    );

    const totalImages = [...updatedImages, ...uniqueImages];
    if (totalImages.length > 5) {
      window.alert("Maximum of 5 images allowed");
    } else {
      const newImages = [...images, ...uniqueImages];
      if (newImages.length > 5) {
        setImage(newImages.slice(0, 5));
      } else {
        setImage(newImages);
      }
    }
  };

  const actionColumn = [
    { field: "medicineId", headerName: "Medicine Id", width: 150 },
    { field: "name", headerName: "Medicine Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "price", headerName: "Retail Price", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 400,
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
            <Link
              to={`/medicines/update/${params.id}`}
              state={{ data: params.row }}
              style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                setSelectedRow(params.row);
                setImageModal(true);
                setUpdatedImage(params.row.images);
              }}>
              Update Images
            </div>
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
        Medicines
        <Link to="/medicines/new" className="link-new">
          Add Medicine
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
                <span>Medicine Name:</span>
                <span> {selectedRow.name}</span>
              </p>
              <p className="modalText">
                <span>Retail Price:</span>
                <span> {selectedRow.price}</span>
              </p>
              <p className="modalText">
                <span>Category:</span>
                <span> {selectedRow.category}</span>
              </p>
              <p className="modalText">
                <span>Genre:</span>
                <span> {selectedRow.genre}</span>
              </p>
              {selectedRow.description !== "undefined" ? (
                <div>
                  <h5>Description: </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(selectedRow.description),
                    }}></div>
                </div>
              ) : (
                ""
              )}
              {selectedRow.benefits !== "undefined" ? (
                <div>
                  <h5>Benefits: </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(selectedRow.benefits),
                    }}></div>
                </div>
              ) : (
                ""
              )}
              {selectedRow.sideeffects !== "undefined" ? (
                <div>
                  <h5>Side Effects: </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(selectedRow.sideeffects),
                    }}></div>
                </div>
              ) : (
                ""
              )}
              {selectedRow.instructions !== "undefined" ? (
                <div>
                  <h5>Instructions: </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(selectedRow.instructions),
                    }}></div>
                </div>
              ) : (
                ""
              )}

              <div>
                <h5>Symptoms: </h5>
                <div style={{ display: "flex" }}>
                  {"{"}
                  {selectedRow.symptoms.map((row) => row.name).join(", ")}
                  {"}"}
                </div>
              </div>
              {selectedRow.directions !== "undefined" ? (
                <div>
                  <h5>Directions: </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(selectedRow.directions),
                    }}></div>
                </div>
              ) : (
                ""
              )}
              {selectedRow.ingredients.length > 0 ? (
                <div>
                  <h5>Ingredients: </h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <p style={{ color: "black", fontWeight: "bold" }}>Name</p>
                    <p style={{ color: "black", fontWeight: "bold" }}>Dosage</p>
                  </div>
                  {selectedRow.ingredients.map((row, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={index}>
                      <p className="modalText">{row.ingredientName}</p>
                      <p className="modalText">
                        {row.weightage} <span>{row.measurement}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              <h5 className="modalText" style={{ textAlign: "center" }}>
                Medicine Images:
              </h5>
              <div className="bannerImage">
                {selectedRow.images.map((row, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={`https://paulbrooksapi.doctorsforhealth.co.uk/images/${row}`}
                        alt={row}
                        width={"100"}
                        height={"100"}
                      />
                    </div>
                  );
                })}
              </div>
              {selectedRow.bannerImage !== null ? (
                <div>
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {openImageModal ? (
        <div className="modal">
          <div className="modalInner">
            <p className="closeModal" onClick={() => setImageModal(false)}>
              &times;
            </p>
            <div style={{ margin: 40 }}>
              <h4>Update images</h4>

              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageUpload}
                multiple
              />
              <button onClick={handleAdd}>Add</button>
              <div>
                {updatedImages.map((row, index) => {
                  console.log(row);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 20,

                        alignItems: "center",
                      }}>
                      <img
                        src={`https://paulbrooksapi.doctorsforhealth.co.uk/images/${row}`}
                        alt={row}
                        width={"50"}
                        height={"50"}
                      />
                      <p
                        className="deleteMedImages"
                        onClick={() => handleDeleteImage(index)}>
                        &times;
                      </p>
                    </div>
                  );
                })}
              </div>
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
        rows={medicines}
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

export default DatatableMedicines;
