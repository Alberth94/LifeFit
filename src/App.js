import React from "react";
import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import SignUp from './Components/User/SignUp'
import LogIn from "./Components/User/LogIn";
import Home from "./Components/Home/Home";
import Posts from "./Components/MealPlan/Posts";
import GoogleMaps from './Components/User/Maps/GoogleMaps'
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ChangePassword from "./Components/User/ChangePassword";

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
          <Route path="/mealplan" element={<Posts/>} />
          <Route path='/googlemaps' element={<GoogleMaps></GoogleMaps>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;