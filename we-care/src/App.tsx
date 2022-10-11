import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/Global.scss";
import { Navbar } from "./Components/Navbar";
import Admin from "./Pages/Admin";
import Clients from "./Pages/Clients";
import Welcome from "./Pages/Welcome";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Context, { auth } from "./Pages/Context";
import { Logout } from "./Pages/Logout";
import Profile from "./Pages/Profile";

function App() {
  {
    /*protect routes */
  }
  const cxt = useContext(auth);
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            {cxt ? (
              <>
                <Route path="/clients" element={<Clients />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                {cxt.isAdmin ? <Route path="/admin" element={<Admin />} /> : <Route path="/welcome" element={<Welcome/>} />}
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </>
            )
            }
            <Route path="/" element ={<Landing/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
