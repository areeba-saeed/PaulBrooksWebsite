import React from "react";
import Login from "./pages/Login/Login";
import Adminroutes from "./routes/adminroutes";
function App() {
  const user = localStorage.getItem("loggedIn");
  console.log(user);
  return (
    <div className="app">{user !== null ? <Adminroutes /> : <Login />}</div>
  );
}

export default App;
