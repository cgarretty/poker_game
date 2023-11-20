import React, { useState, createContext, useContext } from "react";

const UserContext = createContext();
const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  return(
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUser };
