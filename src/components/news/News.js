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
import { MainListItems  } from '../common/listItems';
// import DataTable from './Table';
import { AppBar, Drawer } from '../common/AppBar'
import Button from '@mui/material/Button';
import Articles from './Articles';
import Grid from '@mui/material/Grid';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function News() {
  const [open, setOpen] = React.useState(true);
  const [news, setNews] = React.useState(true);

  React.useEffect(() => {

    axios.get('https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/all-news')
      .then(response => {
        console.log("NEWS RESPONSE ", response)
        const data = response.data;
        setNews(JSON.parse(data.body));
      })
      .catch(error => {
        console.error('Error fetching all news:', error);
      });

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
              News
            </Typography>
            <Grid container spacing={4}>
            <Articles data = {news}/>
            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
