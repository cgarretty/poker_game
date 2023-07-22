import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const clientId =
  "999204329578-8o7b6eqkque0bnnv84d9k5h3nqbmniu8.apps.googleusercontent.com";

const LoginPage = ({ setIsLoggedIn }) => {

  const handleGoogleLogin = (response) => {
    console.log("response: ", response);
    axios
      .post("http://localhost:8000/player/auth/google/", {
        access_token: response.credential,
      })
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login Failed", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Welcome to Texas Hold'em Poker
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please log in to continue.
      </Typography>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<img src="google-icon.png" alt="Google Icon" />}
          >
            Log in with Google
          </Button>
        </GoogleLogin>
      </GoogleOAuthProvider>
    </Box>
  );
};

export default LoginPage;
