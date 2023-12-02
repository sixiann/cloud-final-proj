import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const SearchFilterBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Perform search/filter operations using the searchQuery
    // E.g., call an API, filter data, etc.
  };

  // Function to handle industry filter change
  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
    // Perform filtering based on the selected industry
  };

  // Function to handle investor filter change
  const handleInvestorChange = (event) => {
    setSelectedInvestor(event.target.value);
    // Perform filtering based on the selected investor
  };

  // Function to handle stage filter change
  const handleStageChange = (event) => {
    setSelectedStage(event.target.value);
    // Perform filtering based on the selected stage
  };

  return (
    <Grid container alignItems="center" spacing={2} sx={{paddingBottom: 2}}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Industry</InputLabel>
          <Select
            value={selectedIndustry}
            onChange={handleIndustryChange}
            label="Industry"
          >
            <MenuItem value="">All Industries</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            {/* Add more industry options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Investor</InputLabel>
          <Select
            value={selectedInvestor}
            onChange={handleInvestorChange}
            label="Investor"
          >
            <MenuItem value="">All Investors</MenuItem>
            <MenuItem value="Investor A">Investor A</MenuItem>
            <MenuItem value="Investor B">Investor B</MenuItem>
            {/* Add more investor options as needed */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Stage</InputLabel>
          <Select
            value={selectedStage}
            onChange={handleStageChange}
            label="Stage"
          >
            <MenuItem value="">All Stages</MenuItem>
            <MenuItem value="Seed">Seed</MenuItem>
            <MenuItem value="Series A">Series A</MenuItem>
            {/* Add more stage options as needed */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchChange} // handleSearch is the function to be called when the button is clicked
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchFilterBar;
