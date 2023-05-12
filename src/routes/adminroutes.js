import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import { categoryInputs, categoryUpdate } from "../formSource";
import Users from "../pages/Users/Users";
import UpdateUsers from "../pages/Users/UpdateUsers";
import Symptoms from "../pages/Symptoms/Symptoms";
import Categories from "../pages/Categories/Categories";
import NewCategory from "../pages/Categories/NewCategory";
import UpdateCategory from "../pages/Categories/UpdateCategory";
import Medicines from "../pages/Medicines/Medicines";
import NewMedicine from "../pages/Medicines/NewMedicine";
import UpdateMedicine from "../pages/Medicines/UpdateMedicine";
import Featured from "../pages/Featured/Featured";
import Doctors from "../pages/Doctors/Doctors";
import NewGenre from "../pages/Genres/NewGenre";
import UpdateGenre from "../pages/Genres/UpdateGenre";
import Genres from "../pages/Genres/Genres";
import UpdateAdmin from "../pages/UpdateAdmin/UpdateAdmin";
import UpdateDoctors from "../pages/Doctors/UpdateDoctors";

function Adminroutes() {
  const user = localStorage.getItem("loggedIn");

  return (
    <div>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="symptoms" element={<Symptoms />} />
            <Route path="featured" element={<Featured />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="categories/new"
              element={<NewCategory title="Add New Category" />}
            />
            <Route
              path="categories/update/:id"
              element={<UpdateCategory title="Update Category" />}
            />
            <Route path="genres" element={<Genres />} />
            <Route
              path="genres/new"
              element={<NewGenre title="Add New Genre" />}
            />
            <Route
              path="genres/update/:id"
              element={<UpdateGenre title="Update Genre" />}
            />
            <Route path="medicines" element={<Medicines />} />
            <Route
              path="medicines/new"
              element={
                <NewMedicine inputs={categoryInputs} title="Add New Medicine" />
              }
            />
            <Route
              path="medicines/update/:id"
              element={
                <UpdateMedicine
                  inputs={categoryUpdate}
                  title="Update Medicine"
                />
              }
            />
            <Route path="users" element={<Users />} />
            <Route
              path="users/update/:id"
              element={
                <UpdateUsers inputs={categoryUpdate} title="Update Users" />
              }
            />
            <Route path="doctors" element={<Doctors />} />
            <Route
              path="doctors/update/:id"
              element={<UpdateDoctors title="Update Doctors" />}
            />
            <Route path="update" element={<UpdateAdmin />} />
          </>
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </div>
  );
}

export default Adminroutes;
