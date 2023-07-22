import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import GameTable from "./Components/GameTable";
import axios from "axios";

// style
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Texas Hold'em Poker
            </Typography>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
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
