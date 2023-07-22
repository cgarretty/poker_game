import React from 'react';
import { Link } from 'react-router-dom';

// style
import Button from '@mui/material/Button';


const LoginLogout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    isLoggedIn ?
      <Button color="inherit" onClick={() => setIsLoggedIn(false)}>Logout</Button> :
      <Link to="/login">
        <Button color="inherit">Login</Button>
      </Link>
  );
}


export default LoginLogout;
