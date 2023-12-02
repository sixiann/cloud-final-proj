import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const SearchFilterBar = (props) => {

  const handleSearchChange = (event) => {
    props.setSearchQuery(event.target.value);
  };

  const handleIndustryChange = (event) => {
    props.setSelectedIndustry(event.target.value);
  };

  const handleInvestorChange = (event) => {
    props.setSelectedInvestor(event.target.value);
  };

  const handleStageChange = (event) => {
    props.setSelectedStage(event.target.value);
  };

  return (
    <Grid container alignItems="center" spacing={2} sx={{paddingBottom: 2}}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={props.searchQuery}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Industry</InputLabel>
          <Select
            value={props.selectedIndustry}
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
            value={props.selectedInvestor}
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
            value={props.selectedStage}
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
          onClick={props.handleSearchClick} // handleSearch is the function to be called when the button is clicked
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchFilterBar;
