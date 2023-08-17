import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// global components
import Navigation from "./global_components/navigation/Navigation.js";
import Footer from "./global_components/navigation/Footer.js";
// import axios from "axios";

// nonglobal components
import LoginScreen from "./components/login_screen/LoginScreen.js";
import HomeScreen from "./components/home_screen/HomeScreen.js";
import RegisterScreen from "./components/register_screen/RegisterScreen.js";
import AccountScreen from "./components/account_screen/AccountScreen.js";
import HelpScreen from "./components/help_screen/HelpScreen.js";
import ErrorScreen from "./components/error_screen/ErrorScreen.js";

import './style.css';
import { AuthContext } from "./authentication/auth.js";
import React, { useState} from 'react';
import PrivateRoute from "./authentication/PrivateRoute.js";

function App() {
  // existingToken check cookie is there set to 1 if so else 0
  //var existingToken = 0;
  const existingToken = localStorage.getItem("accessCode");
  const [authTokens, setAuthTokens ] = useState(existingToken);
  const setTokens = (data) => {
    localStorage.setItem("accessCode", data);
    setAuthTokens(data);
  } 

  return (
    <div className="app-container">
      <AuthContext.Provider value ={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <div className="content-wrap">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/help" element={<HelpScreen />} />
              <Route path="/account" element={<PrivateRoute><AccountScreen/></PrivateRoute>}/>
              <Route path="/error" element={<ErrorScreen />} />
              <Route path="/:any" element={<HomeScreen />} />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;

/*

                <Route exact path="/" component={HomeScreen} />
                <Route path="/login" component={LoginScreen} />
                <PrivateRoute path="/profile" component={ProfileScreen} />
                <PrivateRoute exact path="/college" component={CollegeScreen} />
                <PrivateRoute exact path="/college/:id" component={CollegeInfoScreen} />
                <AdminRoute path="/admin" component={AdminScreen} adminOnly={true} />
                <Route path="/error" component={ErrorScreen} />
                <AdminRoute exact path="/allProfiles" component={AllProfilesScreen} />
                <PrivateRoute path="/students/:id" component={ViewOtherProfile} />
                <Route path="/:any" component={HomeScreen} />

*/
