import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import GameTable from "./Components/GameTable";
import NavBar from "./Components/NavBar";
import axios from "axios";



const clientId =
  "999204329578-8o7b6eqkque0bnnv84d9k5h3nqbmniu8.apps.googleusercontent.com";

function LoginPage({ handleGoogleLogin }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const handleGoogleLogin = (response) => {
    console.log("response: ", response);
    axios
      .post("http://localhost:8000/player/auth/google/", {
        access_token: response.credential,
      })
      .then((response) => {
        setIsLoggedIn(true); // Set login status to true on successful login
      })
      .catch((error) => {
        console.error("Login Failed", error);
      });
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <GameTable /> : <LoginPage handleGoogleLogin={handleGoogleLogin} />}
        />
        <Route path="/login" element={<LoginPage handleGoogleLogin={handleGoogleLogin} />} />
        <Route path="/gametable" element={<GameTable />} />
      </Routes>
    </Router>
  );
}

export default App;
