import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import GameTable from "./Components/GameTable";
import axios from "axios";

const clientId =
  "999204329578-8o7b6eqkque0bnnv84d9k5h3nqbmniu8.apps.googleusercontent.com";

function App() {
  const handleGoogleLogin = (response) => {
    console.log("response: ", response);
    axios.post("http://localhost:8000/player/auth/google/", {
      access_token: response.credential,
    });
  };

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
      <GameTable />
    </GoogleOAuthProvider>
  );
}

export default App;
