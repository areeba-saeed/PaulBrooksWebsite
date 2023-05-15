import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../style/datatable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [id, setId] = useState();

  console.log(id);

  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/admin")
      .then((response) => {
        setUsername(response.data[0].username);
        setPassword(response.data[0].password);
        setId(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(`https://paulbrooksapi.doctorsforhealth.co.uk/admin/${id}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setPopupText("Admin updated");
        setPopupshow(true);
        setTimeout(() => {
          window.location.reload();
          setPopupshow(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
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
          Update Admin Credentials
        </div>
        <div className="bottom">
          <div className="right">
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Admin Name</label>
                <input
                  type="text"
                  placeholder="New Medicine Added"
                  className="input-form"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <label className="label-form">Admin Password</label>
                <textarea
                  className="input-form"
                  rows="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export default UpdateAdmin;
