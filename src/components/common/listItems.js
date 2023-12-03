import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export const mainListItems =  (
  <React.Fragment>
    {
      true ?
      <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    :
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    }
    <ListItemButton component={Link} to="/industries">
      <ListItemIcon>
        <AlignHorizontalLeftIcon />
      </ListItemIcon>
      <ListItemText primary="Industries" />
    </ListItemButton>
    <ListItemButton component={Link} to="/companies">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItemButton>
    <ListItemButton component={Link} to="/investors">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Investors" />
    </ListItemButton>
    <ListItemButton component={Link} to="/news">
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="News" />
    </ListItemButton>
  </React.Fragment>
);
