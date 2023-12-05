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

  const handleEmployeeCountChange = (event) => {
    props.setSelectedEmployeeCount(event.target.value);
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
          <InputLabel>Industry</InputLabel>
          <Select
            value={props.selectedIndustry}
            onChange={handleIndustryChange}
            label="Industry"
          >
            {categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}

            {/* <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Employee Count</InputLabel>
          <Select
            value={props.selectedEmployeeCount}
            onChange={handleEmployeeCountChange}
            label="Employee Count"
          >
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-50">11-50</MenuItem>
            <MenuItem value="51-100">51-100</MenuItem>
            <MenuItem value="101-250">101-250</MenuItem>
            <MenuItem value="251-500">251-500</MenuItem>
            <MenuItem value="501-1000">501-1000</MenuItem>
            <MenuItem value="1001-5000">1001-5000</MenuItem>
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

let regions = ['Gujarat', 'Auckland', 'Colorado', 'Tamil Nadu', 'England', 'Florida', "Seoul-t'ukpyolsi", 'Michigan', 'Oxfordshire', 'Ontario', 'North Carolina', 'Illinois', 'Texas', 'Georgia', 'California', 'Karnataka', 'Oulu', 'New York', 'Maharashtra', 'Ile-de-France', 'Victoria', 'Rhone-Alpes', 'Zug', 'Pennsylvania', 'New Jersey', 'Tokyo', 'Niedersachsen', 'Birmingham', 'Madrid', 'Fujian']

const categories = [
  'Leisure', 'Communities', 'Publishing', 'Mobile Devices', 'Recruiting', 'Mobile',
  'Personal Health', 'Developer Tools', 'Accounting', 'Higher Education',
  'Virtual Reality', 'Children', 'Location Based Services', 'Health Care', 'Hospital',
  'Gaming', 'Web Development', 'Enterprise Software', 'Information Technology',
  'Electronics', 'Insurance', 'Building Material', 'Genetics', 'Education', 'Restaurants',
  'Social Media', 'CRM', 'Health Diagnostics', 'Internet', 'Advertising', 'Energy',
  'Bitcoin', 'SEO', 'Ticketing', 'Digital Media', 'Travel', 'Consulting', 'Mobile Payments',
  'Sales', 'Hardware', 'Dental', 'Medical', 'Billing', 'Wearables', 'Digital Marketing',
  'Medical Device', 'Events', 'Legal', 'Nursing and Residential Care', 'Product Design',
  'Human Resources', 'SaaS', 'Finance', 'Developer APIs', 'Universities', 'Food and Beverage',
  'Broadcasting', 'Payments', 'Robotics', 'News', 'Marketing', 'Cryptocurrency',
  'Financial Services', 'Public Relations', 'Telecommunications', 'Life Science',
  'Video Games', 'Database', 'Web Design', 'Analytics', 'Software', 'Food Processing',
  'E-Learning', 'Home Renovation', 'E-Commerce', 'Construction', 'Manufacturing', 'Biotechnology'
];


export default SearchFilterBar;
