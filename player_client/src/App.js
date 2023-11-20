import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateGameTable from "./Components/CreateGameTable";
import GameTable from "./Components/GameTable";
import LoginPage from "./Components/LoginPage";
import NavBar from "./Components/NavBar";
import { useUser } from "./Hooks/UserProvider";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <CreateGameTable /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/gametable/:uuid" element={<GameTable />} />
        <Route path="/gametable/new" element={<CreateGameTable />} />
      </Routes>
    </Router>
  );
}

export default App;
