import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder, onChange, onButtonClick }) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      fullWidth
      onChange={onChange}
      sx={{paddingBottom: 3}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={(event)=>onButtonClick(event)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
