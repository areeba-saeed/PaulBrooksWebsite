import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const NewGenre = ({ title }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    formData.append("image", file);

    axios
      .post("http://localhost:5000/genres/new", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === "Genre already exists") {
          setErrorMessage(true);
          setName("");
          setFile(null);
        } else {
          setName("");
          setPopupshow(true);
          setPopupText("Genre Added");
          setErrorMessage(false);
          setFile(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(true); // will log "Genre already exists"
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
                category already exists
              </div>
            ) : null}
            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                <label className="label-form">Genre Name</label>
                <input
                  type="text"
                  placeholder="Health Care"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="label-form">Genre Image (PNG/JPEG/JPG)</label>
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

export default NewGenre;
