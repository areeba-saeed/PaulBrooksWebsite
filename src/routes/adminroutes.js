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
import Notification from "../pages/Notification/Notification";
import Doctors from "../pages/Doctors/Doctors";

function Adminroutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />

            <Route path="symptoms">
              <Route index element={<Symptoms />} />
            </Route>
            <Route path="featured">
              <Route index element={<Featured />} />
            </Route>
            <Route path="send-notification">
              <Route index element={<Notification />} />
            </Route>

            <Route path="categories">
              <Route index element={<Categories />} />
              <Route
                path="new"
                element={
                  <NewCategory
                    inputs={categoryInputs}
                    title="Add New Category"
                  />
                }
              />
              <Route
                path="update/:id"
                element={
                  <UpdateCategory
                    inputs={categoryUpdate}
                    title="Update Category"
                  />
                }
              />
            </Route>
            <Route path="medicines">
              <Route index element={<Medicines />} />
              <Route
                path="new"
                element={
                  <NewMedicine
                    inputs={categoryInputs}
                    title="Add New Medicine"
                  />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Adminroutes;
