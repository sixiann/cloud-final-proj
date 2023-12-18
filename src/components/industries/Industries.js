import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems  } from '../common/listItems';
import Chart from './Chart';
import ListData from './ListData';
import SavedStartups from '../common/ListData';

import SearchBar from '../common/SearchBar';
import News from './News'
import { AppBar, Drawer } from '../common/AppBar'
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Industries() {
  const [open, setOpen] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [companies, setCompanies] = React.useState([]);
  const [investors, setInvestors] = React.useState([]);
  const [news, setNews] = React.useState([]);


  React.useEffect(() => {
      getAllData();
      console.log("in use effect");
      axios.get('https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/all-news')
      .then(response => {
        const data = response.data;
        setNews(JSON.parse(data.body));
      })
      .catch(error => {
        console.error('Error fetching all news:', error);
      });
  }, []);

  const getAllData = () => {
    console.log("searchhhhh ", searchValue)
    try {
      const requestBody = {
        searchQuery: searchValue,
        category_list: [],
        employee_count: '',
        region: '',
        total_funding: '',
        top: ''
      };
      console.log("req 1", requestBody)

      const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/companies';
      axios.post(url, requestBody)
        .then(response => {
          console.log(" in companies response.data: ", JSON.parse(response.data.body))
          setCompanies(JSON.parse(response.data.body));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      throw error;
    }

    try {
      const requestBody = {
        searchQuery: searchValue,
        investor_types: [],
        region: '',
        total_funding: '',
        top: ''
      };

      console.log("req 2", requestBody)


      const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/investors';
      axios.post(url, requestBody)
        .then(response => {
          console.log(" in investors response.data: ", JSON.parse(response.data.body))

          setInvestors(JSON.parse(response.data.body));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      throw error;
    }
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onButtonClick = () => {
    getAllData()
  }

  // console.log("COMPANIES   : ", companies)
  // console.log("INVESTORS  : ", investors)

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
            Industries
          </Typography>
            {/* <SearchBar placeholder="Search..." onChange={handleSearchChange} onButtonClick={onButtonClick}/> */}
            <Grid container spacing={3}>
              {/* Top Startups */}

              <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h4" gutterBottom sx={{textAlign: 'left'}}>
                Top Startups
              </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 500,
                  }}
                >
                  <SavedStartups data={companies} title={'Top Startups'}/>
                </Paper>
              </Grid>

              {/* Top Investors */}
              <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h4" gutterBottom sx={{textAlign: 'left'}}>
                Top Investors
              </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 500,
                  }}
                >
                  <ListData data={investors} title={'Top Investors'}/>
                </Paper>
              </Grid>


            </Grid>
            <Typography variant="h4" gutterBottom sx={{textAlign: 'left', paddingTop: 5}}>
                The Latest
              </Typography>
            <Grid container spacing={4}>
            <News data={news}/>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
