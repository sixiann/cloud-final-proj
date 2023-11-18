import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder, onChange }) => {
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
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
