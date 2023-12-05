import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { mainListItems  } from '../common/listItems';
import Chart from './Chart';
import SavedStartups from '../common/ListData';
import { AppBar, Drawer } from '../common/AppBar'
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [startups, setStartups] = React.useState([])
  const [investors, setInvestors] = React.useState([])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    //su
    //inv for investors

    //CHANGE TO SAVED STARTUPS API CALL
    axios.get('https://usixt8hpf2.execute-api.us-east-1.amazonaws.com/DEV/data')
      .then(response => {
        const companiesData = response.data;
        setStartups(JSON.parse(companiesData.body));
        // console.log("DATA:", JSON.parse(companiesData.body) )
      })
      .catch(error => {
        console.error('Error fetching all companies:', error);
      });

    //CHANGE TO SAVED INVESTORS API CALL
    axios.get('https://usixt8hpf2.execute-api.us-east-1.amazonaws.com/DEV/data')
      .then(response => {
        const data = response.data;
        setInvestors(JSON.parse(data.body));
        // console.log("DATA:", JSON.parse(companiesData.body) )
      })
      .catch(error => {
        console.error('Error fetching all companies:', error);
      });

    //AXIOS CALL TO DELETE SAVED STARTUP
    //AXIOS CALL TO DELETE SAVED INVESTOR
  }, []);

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
          <Typography variant="h2" gutterBottom>
            Welcome, !
          </Typography>
            <Grid container spacing={3}>


              {/* Saved Startups */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    // width: '100%'
                  }}
                >
                  <SavedStartups title={'Saved Startups'} isDashboard={true}/>
                </Paper>
              </Grid>
              {/* Startups Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    // width: '100%'
                  }}
                >
                  <Chart title={'Startups'}/>
                </Paper>
              </Grid>

              {/* Saved Startups */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <SavedStartups />
                </Paper>
              </Grid> */}


              {/* Investors Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    // width: '100%'
                  }}
                >
                  <Chart title={'Saved Investors'}/>
                </Paper>
              </Grid>

              {/* Saved Investors */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    // width: '100%'
                  }}
                >
                  <SavedStartups title={'Saved Investors'}/>
                </Paper>
              </Grid>


            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
