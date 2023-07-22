import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameTable from "./Components/GameTable";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <GameTable /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/gametable" element={<GameTable />} />
      </Routes>
    </Router>
  );
}

export default App;
