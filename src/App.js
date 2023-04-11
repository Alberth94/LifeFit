import React from "react";
import { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SignUp from './User/SignUp'
import LogIn from "./User/LogIn";
import Home from "./Home/Home";
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ChangePassword from "./User/UserProfile/ChangePassword";

function App() {
  const[userOnOff, setUserOnOff] = useState(false);
  const[externalUserOnOff, setExternalUserOnOff] = useState(false);

  return (  
    <div>
      <BrowserRouter>
        <NavBar userOnOff={userOnOff} setUserOnOff={setUserOnOff} setExternalUserOnOff={setExternalUserOnOff} externalUserOnOff={externalUserOnOff} />
        <Routes>
          <Route path="/signup" element={<SignUp setUserOnOff={setUserOnOff} setExternalUserOnOff={setExternalUserOnOff} />} />
          <Route path="/login" element={<LogIn setUserOnOff={setUserOnOff} setExternalUserOnOff={setExternalUserOnOff}/>}></Route>
          <Route path="/changepassword" element={<ChangePassword userOnOff={userOnOff}></ChangePassword>} /> 
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;