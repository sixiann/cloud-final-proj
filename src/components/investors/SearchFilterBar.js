import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilterBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStartup, setSelectedStartup] = useState('');
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

  // Function to handle startup filter change
  const handleStartupChange = (event) => {
    setSelectedStartup(event.target.value);
    // Perform filtering based on the selected startup
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
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
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
          <InputLabel>Startup</InputLabel>
          <Select
            value={selectedStartup}
            onChange={handleStartupChange}
            label="Startup"
          >
            <MenuItem value="">All Startups</MenuItem>
            <MenuItem value="Startup A">Startup A</MenuItem>
            <MenuItem value="Startup B">Startup B</MenuItem>
            {/* Add more startup options as needed */}
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
    </Grid>
  );
};

export default SearchFilterBar;
