import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { MainListItems  } from '../common/listItems';
import DataTable from './Table';
import { AppBar, Drawer } from '../common/AppBar'
import SearchFilterBar from './SearchFilterBar';
import axios from 'axios';
import {
  // getFilteredCompanies,
  updateSavedStartup,
} from './requests';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Companies() {

  const [open, setOpen] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIndustry, setSelectedIndustry] = React.useState('');
  const [selectedEmployeeCount, setSelectedEmployeeCount] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [selectedFunding, setSelectedFunding] = React.useState('');
  const [selectedRows, setSelectedRows] =  React.useState(null);
  const [updateResult, setUpdateResult] = React.useState('');

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  React.useEffect(() => {
    axios.get('https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/all-companies')
      .then(response => {
        const companiesData = response.data;
        setCompanies(JSON.parse(companiesData.body));
      })
      .catch(error => {
        console.error('Error fetching all companies:', error);
      });

  }, []);

  const handleSearchClick = async () => {
    try {
      getFilteredCompanies(searchQuery, selectedIndustry, selectedEmployeeCount, selectedRegion, selectedFunding);
    } catch (error) {
      console.error('Error fetching companies based on search:', error);
    }
  };

  const getFilteredCompanies = async (searchQuery, industryId, employeeCount, region, funding) => {
    // console.log("filters   : ", searchQuery, industryId, employeeCount, region, funding)
    try {
      const requestBody = {
        searchQuery: searchQuery,
        category_list: !industryId.length ? [] :[industryId],
        employee_count: employeeCount,
        region: region,
        total_funding: funding
      };

      // console.log("REQUEST ", requestBody)

      const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/companies';
      axios.post(url, requestBody)
        .then(response => {
          setCompanies(JSON.parse(response.data.body));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      throw error;
    }
  };

  const saveData = async () => {
    // console.log("UPDATE RESULT   ", selectedRows)
    try {
      const result = await updateSavedStartup(selectedRows);
      setUpdateResult(result);
    } catch (error) {
      console.error('Error updating startup:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            {MainListItems()}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Companies
          </Typography>
          <SearchFilterBar
            searchQuery={searchQuery}
            selectedIndustry={selectedIndustry}
            selectedEmployeeCount={selectedEmployeeCount}
            selectedRegion={selectedRegion}
            selectedFunding={selectedFunding}
            setSearchQuery={setSearchQuery}
            setSelectedIndustry={setSelectedIndustry}
            setSelectedEmployeeCount={setSelectedEmployeeCount}
            setSelectedRegion={setSelectedRegion}
            setSelectedFunding={setSelectedFunding}
            handleSearchClick={handleSearchClick}
            />
            {/* <DataTable data={companies} setCheckedRows={setSelectedRows}/> */}
            {companies ? <DataTable data={companies} setCheckedRows={setSelectedRows}/> : <div>Loading...</div>}
            <div style={{  right: 20, bottom: 20, paddingTop: 10 }}>
              <Button variant="contained" color="primary" onClick={saveData}>
                Save
              </Button>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
