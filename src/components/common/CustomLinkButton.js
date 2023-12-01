import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomLinkButton = ({ to, primary }) => {
  return (
    <ListItemButton
      component={Link}
      to={to}
      sx={{
        width: 150,
        height: 50,
        backgroundColor: '#1976D2',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1565C0',
        },
      }}
    >
      <ListItemText
        primary={primary}
        sx={{
          textAlign: 'center', // Center the text horizontally
        }}
      />
    </ListItemButton>
  );
};

export default CustomLinkButton;
