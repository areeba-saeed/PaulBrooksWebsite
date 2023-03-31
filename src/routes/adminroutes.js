import React from "react";
import Home from "../pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Adminroutes() {
  const user = localStorage.getItem("loggedIn");

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/dashboard" element={<Home />} />
          <Route path="symptoms">
            <Route index element={<Symptoms />} />
          </Route>
          <Route path="featured">
            <Route index element={<Featured />} />
          </Route>
          {/*   <Route path="send-notification">
          <Route index element={<Notification />} />
        </Route>*/}

          <Route path="categories">
            <Route index element={<Categories />} />
            <Route
              path="new"
              element={<NewCategory title="Add New Category" />}
            />
            <Route
              path="update/:id"
              element={<UpdateCategory title="Update Category" />}
            />
          </Route>
          <Route path="genres">
            <Route index element={<Genres />} />
            <Route path="new" element={<NewGenre title="Add New Genre" />} />
            <Route
              path="update/:id"
              element={<UpdateGenre title="Update Genre" />}
            />
          </Route>
          <Route path="medicines">
            <Route index element={<Medicines />} />
            <Route
              path="new"
              element={
                <NewMedicine inputs={categoryInputs} title="Add New Medicine" />
              }
            />
            <Route
              path="update/:id"
              element={
                <UpdateMedicine
                  inputs={categoryUpdate}
                  title="Update Medicine"
                />
              }
            />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
            <Route
              path="update/:id"
              element={
                <UpdateUsers inputs={categoryUpdate} title="Update Users" />
              }
            />
          </Route>
          <Route path="doctors">
            <Route index element={<Doctors />} />
          </Route>
          <Route path="update">
            <Route index element={<UpdateAdmin />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Adminroutes;
