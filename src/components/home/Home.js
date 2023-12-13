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
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { MainListItems  } from '../common/listItems';
import Card from '../common/Card'
import { AppBar, Drawer } from '../common/AppBar'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomLinkButton from '../common/CustomLinkButton';


const homepageText = 'StartupsNYC amplifies your startup journey with intuitive ecosystem mapping. It generates visualizations that complement your research and provide further insights into the NYC entreprneurship ecosystem.'

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

export default function Home(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log("PROPS: ", props)

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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '60%' }}>
              <Typography variant="h1" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                Discover the Startups of NYC
              </Typography>
              <div style={{ textAlign: 'left' }}>
                <CustomLinkButton to="/signin" primary="Log In" />
              </div>
            </div>

            {/* <div style={{ width: '40%', textAlign: 'right', paddingLeft: 40 }}>
            <img
              src="startup-3.jpeg" // Replace this URL with your image URL
              alt="Your Image Alt Text"
              style={{ borderRadius: '10%', width: '100%', height: 'auto' }} // Adjust styling as needed
            />
            </div> */}
          </div>


          <Divider sx={{ marginY: 2, paddingTop: 10 }} /> {/* Adds a divider with vertical margin */}
          <Typography variant="h4" gutterBottom sx={{ width: '100%', textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', padding: '100px' }}>
            {homepageText}
          </Typography>
            <Grid container spacing={4}>

                <Card image='icon1.png' title='Custom Dashboard' description='Create your own custom dashboard with your favorite startups and investors.'/>

                <Card image='icon2.png' title='Startups & Investors' description='Develop a comprehensive overview of the biggest players in NYC’s startup space.'/>

                <Card image='icon3.png' title='Industry' description='Learn about the most promising startups in an industry of your choosing'/>

                <Card image='icon4.png' title='News & Events' description='Stay up to date with the latest new and events in the NYC startup ecosystem.'/>

            </Grid>


            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

