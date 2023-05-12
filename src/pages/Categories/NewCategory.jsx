import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { uid } from "uid";
import PopupAlert from "../../components/popupalert/popupAlert";

const NewCategory = ({ title }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    formData.append("image", file);

    axios
      .post("https://paulbrooksapi.doctorsforhealth.co.uk/categories/new", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === "Category already exists") {
          setErrorMessage(true);
          setName("");
          setFile(null);
        } else {
          setName("");
          setPopupshow(true);
          setPopupText("Category Added");
          setErrorMessage(false);
          setFile(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(true); // will log "Category already exists"
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
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
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {errorMessage ? (
              <div style={{ color: "red", fontSize: 10 }}>
                Category already exists
              </div>
            ) : null}
            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                <label className="label-form">Category Name</label>
                <input
                  type="text"
                  placeholder="Health Care"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="label-form">Category Description</label>
                <textarea
                  className="input-form"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <label className="label-form">
                  Category Image (PNG/JPEG/JPG)
                </label>
                <input
                  type="file"
                  id="myFile"
                  accept=".png, .jpg, .jpeg"
                  name="myFile"
                  onChange={handleImageUpload}
                />
                <button className="createButton">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
