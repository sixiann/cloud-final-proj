import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { mainListItems  } from '../common/listItems';
import DataTable from './Table';
import { AppBar, Drawer } from '../common/AppBar'
import Button from '@mui/material/Button';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        StartupsNYC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Companies() {
  const [open, setOpen] = React.useState(true);
  const [investors, setInvestors] = React.useState(true);


  React.useEffect(() => {
    //inv for investors
    // --> /all-companies

    axios.get('https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/all-investors')
      .then(response => {
        console.log("INVESTORS RESPONSE ", response)
        const data = response.data;
        setInvestors(JSON.parse(data.body));
      })
      .catch(error => {
        console.error('Error fetching all investors:', error);
      });

  }, []);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const saveData = () => {
    // Implement your save logic here
    console.log('Data saved!');
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
              Investors
            </Typography>
            <DataTable />
            <div style={{  right: 20, bottom: 20, paddingTop: 10 }}>
              <Button variant="contained" color="primary" onClick={saveData}>
                Save
              </Button>
            </div>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
