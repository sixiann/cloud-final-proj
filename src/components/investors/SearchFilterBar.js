import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const SearchFilterBar = (props) => {

  const handleSearchChange = (event) => {
    props.setSearchQuery(event.target.value);
  };

  const handleInvestorTypeChange = (event) => {
    props.setSelectedInvestorType(event.target.value);
  };

  const handleRegionChange = (event) => {
    props.setSelectedRegion(event.target.value);
  };

  const handleFundingChange = (event) => {
    props.setSelectedFunding(event.target.value);
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
          <InputLabel>Investor Type</InputLabel>
          <Select
            value={props.selectedInvestorType}
            onChange={handleInvestorTypeChange}
            label="Investor Type"
          >
            {categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}

            {/* <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            value={props.selectedRegion}
            onChange={handleRegionChange}
            label="Region"
          >
            {regions.map((region) => (
                <MenuItem value={region} key={region}>{region}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Funding</InputLabel>
          <Select
            value={props.selectedFunding}
            onChange={handleFundingChange}
            label="Funding"
          >
            <MenuItem value={0}>Less than 5 million</MenuItem>
            <MenuItem value={1}>5 - 10 million</MenuItem>
            <MenuItem value={2}>10 - 15 million</MenuItem>
            <MenuItem value={3}>More than 15 million </MenuItem>
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

let regions = [0, 'Suffolk', 'California', 'Tokyo', 'England', 'Haryana', 'Washington', 'Tel Aviv', 'Zurich', 'Beijing', 'Saskatchewan', 'New York', 'Noord-Brabant', 'Illinois', 'Berlin', 'Nevada', 'New Jersey', 'Pennsylvania', 'New South Wales', 'Bayern', 'Fribourg', 'Ontario', 'British Columbia', 'Maharashtra', 'Sao Paulo']

const categories = [
  'angel', 'private_equity_firm', 'venture_capital', 'investment_partner', 'accelerator', 'investment_bank'
];


export default SearchFilterBar;
