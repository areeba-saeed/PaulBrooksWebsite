import React from "react";
import Login from "./pages/Login/Login";
import Adminroutes from "./routes/adminroutes";
function App() {
  const user = localStorage.getItem("loggedIn");
  return <div className="app">{user ? <Adminroutes /> : <Login />}</div>;
}

export default App;
