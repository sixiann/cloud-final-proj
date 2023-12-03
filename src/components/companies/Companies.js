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
import { mainListItems  } from '../common/listItems';
import DataTable from './Table';
import { AppBar, Drawer } from '../common/AppBar'
import SearchFilterBar from './SearchFilterBar';
import axios from 'axios';
import {
  getFilteredCompanies,
  updateSavedStartup,
} from './requests';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Companies() {

  const [open, setOpen] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIndustry, setSelectedIndustry] = React.useState('');
  const [selectedInvestor, setSelectedInvestor] = React.useState('');
  const [selectedStage, setSelectedStage] = React.useState('');
  const [selectedRows, setSelectedRows] =  React.useState(null);
  const [updateResult, setUpdateResult] = React.useState('');

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  React.useEffect(() => {
    // Fetch all companies when the component mounts

    //su
    //inv for investors
    axios.get('https://usixt8hpf2.execute-api.us-east-1.amazonaws.com/DEV/data')
      .then(response => {
        const companiesData = response.data;
        setCompanies(JSON.parse(companiesData.body));
      })
      .catch(error => {
        console.error('Error fetching all companies:', error);
      });
  }, []);

  const handleSearchClick = async () => {
    console.log(searchQuery, selectedIndustry, selectedInvestor, selectedStage);
    try {
      const result = await getFilteredCompanies(searchQuery, selectedIndustry, selectedInvestor, selectedStage);
      setCompanies(result);
    } catch (error) {
      // Handle error
      console.error('Error fetching companies based on search:', error);
    }
  };

  const saveData = async () => {
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
            {mainListItems}
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
            selectedInvestor={selectedInvestor}
            selectedStage={selectedStage}
            setSearchQuery={setSearchQuery}
            setSelectedIndustry={setSelectedIndustry}
            setSelectedInvestor={setSelectedInvestor}
            setSelectedStage={setSelectedStage}
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


// const rows = [
//   {
//     id: 1,
//     name: 'Startup One',
//     industry: 'Technology',
//     location: 'San Francisco, CA',
//     description: 'This is a description for Startup One in the technology industry.',
//   },
//   {
//     id: 2,
//     name: 'Startup Two',
//     industry: 'Healthcare',
//     location: 'New York, NY',
//     description: 'This is a description for Startup Two in the healthcare industry.',
//   },
//   {
//     id: 3,
//     name: 'Startup Three',
//     industry: 'Finance',
//     location: 'London, UK',
//     description: 'This is a description for Startup Three in the finance industry.',
//   },
//   {
//     id: 4,
//     name: 'Startup Four',
//     industry: 'E-commerce',
//     location: 'Berlin, Germany',
//     description: 'This is a description for Startup Four in the e-commerce industry.',
//   },
//   {
//     id: 5,
//     name: 'Startup Five',
//     industry: 'Food & Beverage',
//     location: 'Tokyo, Japan',
//     description: 'This is a description for Startup Five in the food & beverage industry.',
//   },
//   {
//     id: 6,
//     name: 'Startup Six',
//     industry: 'Education',
//     location: 'Sydney, Australia',
//     description: 'This is a description for Startup Six in the education industry.',
//   },
//   {
//     id: 7,
//     name: 'Startup Seven',
//     industry: 'Automotive',
//     location: 'Los Angeles, CA',
//     description: 'This is a description for Startup Seven in the automotive industry.',
//   },
//   {
//     id: 8,
//     name: 'Startup Eight',
//     industry: 'Entertainment',
//     location: 'Paris, France',
//     description: 'This is a description for Startup Eight in the entertainment industry.',
//   },
//   {
//     id: 9,
//     name: 'Startup Nine',
//     industry: 'Fashion',
//     location: 'Milan, Italy',
//     description: 'This is a description for Startup Nine in the fashion industry.',
//   },
//   {
//     id: 10,
//     name: 'Startup Ten',
//     industry: 'Travel & Tourism',
//     location: 'Barcelona, Spain',
//     description: 'This is a description for Startup Ten in the travel & tourism industry.',
//   },
//   {
//     id: 11,
//     name: 'Startup Eleven',
//     industry: 'Real Estate',
//     location: 'Toronto, Canada',
//     description: 'This is a description for Startup Eleven in the real estate industry.',
//   },
//   {
//     id: 12,
//     name: 'Startup Twelve',
//     industry: 'Energy',
//     location: 'Oslo, Norway',
//     description: 'This is a description for Startup Twelve in the energy industry.',
//   },
//   {
//     id: 13,
//     name: 'Startup Thirteen',
//     industry: 'Telecommunications',
//     location: 'Seoul, South Korea',
//     description: 'This is a description for Startup Thirteen in the telecommunications industry.',
//   },
//   {
//     id: 14,
//     name: 'Startup Fourteen',
//     industry: 'Agriculture',
//     location: 'São Paulo, Brazil',
//     description: 'This is a description for Startup Fourteen in the agriculture industry.',
//   },
//   {
//     id: 15,
//     name: 'Startup Fifteen',
//     industry: 'Biotechnology',
//     location: 'Zurich, Switzerland',
//     description: 'This is a description for Startup Fifteen in the biotechnology industry.',
//   },
// ];


