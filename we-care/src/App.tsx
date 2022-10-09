import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "./Styles/Global.scss"
import { Navbar } from "./Components/Navbar";
import Admin from "./Pages/Admin";
import Clients from "./Pages/Clients";
import Homepage from "./Pages/Homepage";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/clients" element={<Clients/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
