import React from 'react';
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useUser } from '../Hooks/UserProvider';

// style
import Button from '@mui/material/Button';


const LoginLogout = () => {

  const { isLoggedIn, setProfile, setIsLoggedIn } = useUser();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile([]);
    googleLogout();
  }

  return (
    isLoggedIn ?
      <Button color="inherit" onClick={() => handleLogout()}>Logout</Button> :
      <Link to="/login">
        <Button color="inherit">Login</Button>
      </Link>
  );
}


export default LoginLogout;
