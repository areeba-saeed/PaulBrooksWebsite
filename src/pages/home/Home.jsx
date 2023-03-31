import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import "../../style/datatable.css";
import "../../style/new.scss";
import Widget from "../../components/widget/Widget";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useState } from "react";

const Home = () => {
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

    axios.post("http://localhost:5000/medicines/notification", notification);
    try {
      setPopupshow(true);
      setPopupText("Notification has been sent");
      setTitle("");
      setDescription("");
      setTimeout(() => {
        setPopupshow(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="doctors" />
          <Widget type="medicines" />
          <Widget type="cities" />
        </div>
        <div className="widgets">
          <Widget type="countries" />
          <Widget type="herbal" />
          <Widget type="homopethic" />
          <Widget type="natural" />
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
              <div
                className="formInput"
                style={{
                  flexDirection: "column",
                  display: "flex",
                  width: "40%",
                  marginLeft: 20,
                }}>
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

export default Home;
