import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateGenre = ({ title }) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/genres")
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data.find((user) => user._id === id);
          if (user) {
            setName(user.name);
            setFile(user.image);
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

    formData.append("image", file);

    axios
      .post(`http://localhost:5000/genres/update/${id}`, formData)
      .then((res) => {
        setPopupshow(true);
        setPopupText("Genre Update");
      })
      .catch((err) => {
        console.log(err);
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
                Genre already exists
              </div>
            ) : null}
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Genre Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label-form">Genre Image (PNG/JPEG/JPG)</label>
                <div className="formInput">
                  <input
                    type="file"
                    id="myFile"
                    accept=".png, .jpg, .jpeg"
                    name="myFile"
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

export default UpdateGenre;
