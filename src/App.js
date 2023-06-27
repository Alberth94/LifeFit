import React from "react";
import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import SignUp from './Components/User/SignUp'
import LogIn from "./Components/User/LogIn";
import Home from "./Components/Home/Home";
import MealPlans from "./Components/MealPlans/MealPlans";
import Articles from "./Components/Articles/Articles";
import Workouts from "./Components/Workouts/Workouts";
import RecommendationsAndReviews from "./Components/RecommendationsAndReviews/RecommendationsAndReviews";
import UserRoute from './Components/User/UserRoute/UserRoute'
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
          <Route path="/mealplans" element={<MealPlans/>} />
          <Route path="/articles" element={<Articles/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/recommendationsandreviews" element={<RecommendationsAndReviews/>} />
          <Route path="/userroute" element={<UserRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;