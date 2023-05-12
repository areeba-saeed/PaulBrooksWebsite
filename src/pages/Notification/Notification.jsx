import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../style/datatable.css";
import { useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const notification = {
      title: title,
      description: description,
    };

    axios.post("https://paulbrooksapi.doctorsforhealth.co.uk/medicines/notification", notification);
    try {
      console.log("Success");
      setPopupshow(true);
      setPopupText("Notification has been sent");
      setTimeout(() => {
        setPopupshow(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
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
        <div className="datatableTitle" style={{ marginLeft: 20 }}>
          Send Notifications
        </div>
        <div className="bottom">
          <div className="right">
            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                <label className="label-form">Notification Title</label>
                <input
                  type="text"
                  placeholder="New Medicine Added"
                  className="input-form"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
                <label className="label-form">Notification Message</label>
                <textarea
                  className="input-form"
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
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

export default Notification;
