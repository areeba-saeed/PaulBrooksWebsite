import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateCategory = ({ title }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [initialFile, setInitialFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/categories")
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data.find((user) => user._id === id);
          if (user) {
            setName(user.name);
            setDescription(user.description);
            if (user.image) {
              fetch(
                `https://paulbrooksapi.doctorsforhealth.co.uk/images/${user.image}`
              )
                .then((response) => response.blob())
                .then((blob) => {
                  const file = new File([blob], user.image, {
                    type: blob.type,
                  });
                  setFile(file);
                  setInitialFile(file);
                })
                .catch((error) => console.log(error));
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);

    axios
      .post(
        `https://paulbrooksapi.doctorsforhealth.co.uk/categories/update/${id}`,
        formData
      )
      .then((res) => {
        setPopupshow(true);
        setPopupText("Category Update");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true); // will log "Category already exists"
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setInitialFile(selectedFile);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
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
        <div className="bottom">
          <div className="right">
            {errorMessage ? (
              <div style={{ color: "red", fontSize: 10 }}>
                Category already exists
              </div>
            ) : null}
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Category Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <div className="formInput">
                  <input
                    type="file"
                    id="myFile"
                    accept=".png, .jpg, .jpeg"
                    name="myFile"
                    defaultValue={initialFile}
                    onChange={handleImageUpload}
                  />
                </div>
                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
