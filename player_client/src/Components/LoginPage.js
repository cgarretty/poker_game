import React from "react";
import { useUser } from '../Hooks/UserProvider';

// style
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const clientId =
  "999204329578-8o7b6eqkque0bnnv84d9k5h3nqbmniu8.apps.googleusercontent.com";

const LoginPage = () => {
  const { setProfile, setIsLoggedIn } = useUser();

  const handleGoogleLogin = (response) => {
    console.log("response: ", response);
    axios(
      {
          method: "post",
          url: "http://localhost:8000/player/auth/google/",
          headers: { Authorization: `Bearer ${response.credential}` }
      }
    )
      .then(() => {
        setProfile(response);
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
