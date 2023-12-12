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
import { MainListItems }  from '../common/listItems';
import Chart from './Chart';
import ChartInv from './Chart-inv';
import SavedStartups from '../common/ListData';
import { AppBar, Drawer } from '../common/AppBar'
import axios from 'axios';
import { getUser } from '../../service/AuthService';
import { useNavigate } from "react-router-dom";

const getUsername = () => {
  const user = getUser();
  if (user) {
    return user.username;
  } else {
    return '';
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  React.useEffect(() => {
    const fetchData = () => {
      const user = getUser();
      if (user) {
        setName(user.name || '');
        setUsername(user.username || '');
        setEmail(user.email || '');
        setIsLoggedIn(true);
      }
      if (!user) {
        navigate("/signin");
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const [open, setOpen] = React.useState(true);
  const [startups, setStartups] = React.useState([])
  const [investors, setInvestors] = React.useState([])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    getAllData()
  }, []);

  const getAllData = () => {
    try {

      const requestBody = {
        username: getUsername(),
        feature: "saved_startups"
      };

      const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/users/data';
      axios.post(url, requestBody)
        .then(response => {
          setStartups(JSON.parse(response.data.body));


        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      throw error;
    }

    try {
        const requestBody = {
          username: getUsername(),
          feature: "saved_investors"
        };
        const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/users/data';
        axios.post(url, requestBody)
          .then(response => {
            setInvestors(JSON.parse(response.data.body));
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        throw error;
      }

  }
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
          <Typography variant="h2" gutterBottom>
            Welcome, {name}!
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
                  <SavedStartups getAllData={getAllData} title={'Saved Startups'} isDashboard={true} data = {startups}/>
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
                  <Chart title={'Startups'} data={startups}/>
                </Paper>
              </Grid>

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
                  <ChartInv title={'Investors'} data={investors}/>
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
                  <SavedStartups getAllData={getAllData} title={'Saved Investors'} isDashboard={true} data={investors}/>
                </Paper>
              </Grid>


            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
