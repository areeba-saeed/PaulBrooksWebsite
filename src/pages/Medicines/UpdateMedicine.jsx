import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
const { uid } = require("uid");

const RandomDigit = uid();

const randomString = RandomDigit.replace(/[^0-9a-zA-Z]/g, "") // remove non-digits
  .substring(0, 7); // extract first 5 digits

const UpdateMedicine = ({ title }) => {
  const location = useLocation();
  const medicineData = location.state.data;
  const [name, setName] = useState(medicineData.name);
  const [bannerImage, setFile] = useState(medicineData.bannerImage);
  const [description, setDescription] = useState(
    JSON.parse(medicineData.description)
  );
  const [benefits, setBenefits] = useState(JSON.parse(medicineData.benefits));
  const [sideeffects, setSideEffects] = useState(
    JSON.parse(medicineData.sideeffects)
  );
  const [directions, setDirections] = useState(
    JSON.parse(medicineData.directions)
  );
  const [images, setImages] = useState(medicineData.images);
  const [instructions, setInstructions] = useState(
    JSON.parse(medicineData.instructions)
  );
  const [ingredients, setingredients] = useState(medicineData.ingredients);
  const [category, setcategory] = useState(medicineData.category);
  const [symptoms, setsymptoms] = useState(
    medicineData.symptoms?.map((symptom) => ({
      label: symptom.name,
      value: symptom.name,
    })) || []
  );

  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [weightage, setWeightage] = useState();
  const [measurement, setMeasurement] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setAllCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/symptoms")
      .then((response) => {
        if (response.data.length > 0) {
          setAllSymptoms(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5000/medicines/${medicineData.bannerImage}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", JSON.stringify(description));
    formData.append("benefits", JSON.stringify(benefits));
    symptoms.map((symptom, index) => {
      formData.append(`symptoms[${index}][name]`, symptom.name);
    });
    ingredients.forEach((ingredient, index) => {
      formData.append(
        `ingredients[${index}][ingredientName]`,
        ingredient.ingredientName
      );
      formData.append(`ingredients[${index}][weightage]`, ingredient.weightage);
      formData.append(
        `ingredients[${index}][measurement]`,
        ingredient.measurement
      );
    });
    formData.append("sideeffects", JSON.stringify(sideeffects));
    formData.append("category", category);
    formData.append("medicineId", randomString);
    formData.append("directions", JSON.stringify(directions));
    formData.append("instructions", JSON.stringify(instructions));
    formData.append("bannerImage", bannerImage);
    images.forEach((image) => {
      formData.append("images", image);
    });
    axios
      .post(
        `http://localhost:5000/medicines/update/${medicineData._id}`,
        formData
      )
      .then((response) => {
        if (ingredients.length > 0) {
          console.log(response.data);

          setPopupshow(true);
          setPopupText("Medicine Updated");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleBannerImageUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);
  };

  const addIngredients = () => {
    if (!ingredientName || !measurement || !weightage) {
      alert("Please fill all the ingredients input");
    } else {
      setingredients([
        ...ingredients,
        {
          ingredientName: ingredientName,
          weightage: weightage,
          measurement: measurement,
        },
      ]);
      setIngredientName("");
      setWeightage("");
    }
  };
  const updatedSymptoms = allSymptoms.map((item) => ({
    ...item,
    value: item.name,
    label: item.name,
  }));

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
            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                {/* Name */}
                <label className="label-form">Medicine Name</label>
                <input
                  type="text"
                  placeholder="Health Care"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {/* Categories */}
                <label className="label-form">Medicine Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                  className="input-form">
                  {allCategories.map((row) => (
                    <option value={row.name} key={row.name}>
                      {row.name}
                    </option>
                  ))}
                </select>
                {/*Symptoms*/}
                <label className="label-form">Medicine Symptoms</label>
                <Select
                  options={updatedSymptoms}
                  isMulti
                  value={symptoms}
                  onChange={(selected) => setsymptoms(selected)}
                />
                {/* Description */}
                <label htmlFor="description" className="label-form">
                  Medicine Description: (Max 10 points)
                </label>
                <ReactQuill
                  value={description}
                  onChange={(value) => setDescription(value)}
                />
                {/* Ingredients*/}
                <label className="label-form">Medicine Ingredients*</label>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <input
                    type="text"
                    placeholder="Ingredient Name"
                    className="input-form ingrdientNameInput"
                    value={ingredientName}
                    onChange={(e) => {
                      setIngredientName(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="5 mg"
                    className="input-form weightageInput"
                    style={{ width: 120 }}
                    value={weightage}
                    onChange={(e) => {
                      setWeightage(e.target.value);
                    }}
                  />
                  <select
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}>
                    <option value=""></option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="oz">oz</option>
                    <option value="lbs">lbs</option>
                    <option value="ml">ml</option>
                    <option value="tsp">tsp</option>
                    <option value="Tbsp">Tbsp</option>
                    <option value="l">liter</option>
                    <option value="l">liter</option>
                  </select>

                  <div
                    onClick={addIngredients}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      cursor: "pointer",
                      padding: 5,
                    }}>
                    Add
                  </div>
                </div>
                <ul>
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <p>{item.ingredientName}</p>

                      <p>
                        {item.weightage} <span> {item.measurement}</span>
                      </p>
                    </li>
                  ))}
                </ul>
                {/* Instructions*/}
                <label className="label-form">Medicine Instructions</label>
                <ReactQuill
                  value={instructions}
                  onChange={(value) => setInstructions(value)}
                />
                {/* Benefits*/}
                <label className="label-form">Medicine Benefits</label>
                <ReactQuill
                  value={benefits}
                  onChange={(value) => setBenefits(value)}
                />
                {/* SideEffects*/}
                <label className="label-form">Medicine Side-effects</label>
                <ReactQuill
                  value={sideeffects}
                  onChange={(value) => setSideEffects(value)}
                />
                {/* Directions*/}
                <label className="label-form">Medicine Directions</label>
                <ReactQuill
                  value={directions}
                  onChange={(value) => setDirections(value)}
                />

                {/*  Images */}
                <label className="label-form">
                  Medicine Image (PNG/JPEG/JPG) (Max 5)
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageUpload}
                  multiple
                />
                {/* Banner Image */}
                <label className="label-form">
                  Medicine Banner Image (PNG/JPEG/JPG)
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleBannerImageUpload}
                />

                {/*Sumit Buttom*/}
                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedicine;
