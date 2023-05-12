import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";
import axios from "axios";

const UpdateUsers = ({ title }) => {
  const location = useLocation();
  const userData = location.state.data;
  const { id } = useParams();
  const [name, setName] = useState(userData.name);
  const [password, setPassword] = useState(userData.password);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [country, setCountry] = useState(userData.country);
  const [city, setCity] = useState(userData.city);
  const [allCountries, setAllContries] = useState([]);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.100.22:5000/countries`)
      .then((response) => {
        setAllContries(response.data);
        const selectedCountry = response.data.find((c) => c.name === country);
        setAllCities(selectedCountry.cities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    const dataUsers = {
      // name: name,
      password: password,
      // country: country,
      // city: city,
    };
    axios
      .put(
        `https://paulbrooksapi.doctorsforhealth.co.uk/users/update/${id}`,
        dataUsers
      )
      .then((res) => {
        setPopupshow(true);
        setPopupText("User Updated");
        setTimeout(() => {
          setPopupshow(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
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
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
              
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
