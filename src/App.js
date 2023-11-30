import './App.css';
import * as React from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import Industries from './components/industries/Industries'
import Companies from './components/companies/Companies'
import Investors from './components/investors/Investors'
import { AppBar, Drawer } from './components/common/AppBar'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* Home */}
            </Typography>
            <IconButton color="inherit">
            {
              isLoggedIn ?
              <Button color="inherit">Log Out</Button>
              : <Button color="inherit">Log In</Button>
            }
            </IconButton>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/industries" element={<Industries isLoggedIn={isLoggedIn}/>} />
          <Route path="/companies" element={<Companies isLoggedIn={isLoggedIn}/>} />
          <Route path="/investors" element={<Investors isLoggedIn={isLoggedIn}/>} />
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn}/>} />
          <Route path="/signin" element={<SignIn isLoggedIn={isLoggedIn}/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;


