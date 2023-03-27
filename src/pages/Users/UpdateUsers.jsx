import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";
import axios from "axios";

const UpdateUsers = ({ title }) => {
  const location = useLocation();
  const userData = location.state.data;
  const [name, setName] = useState(userData.name);
  const [phoneNo, setPhoneNo] = useState(userData.phoneNo);
  const [password, setPassword] = useState(userData.password);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");


  const handleUpdate = (e) => {
    e.preventDefault();

    const dataUsers = {
      name: name,
      password: password,
    };
    axios
      .post(
        `http://localhost:5000/users/update/${userData._id}`,
        dataUsers
      )
      .then((res) => {
        setPopupshow(true);
        setPopupText("User Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
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
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Name</label>
                <input
                  type="text"
                  placeholder="Areeba"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="label-form">Phone No.</label>
                <input
                  type="text"
                  placeholder="0333-333333"
                  className="input-form"
                  style={{ color: "gray" }}
                  value={phoneNo}
                  readOnly={true}
                />
                <label className="label-form">Password</label>
                <input
                  type="text"
                  placeholder="0333-333333"
                  className="input-form"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
