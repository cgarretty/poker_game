import React from 'react';
import LoginLogout from './LoginLogout';

// style
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  return (
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
          <LoginLogout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default NavBar;
