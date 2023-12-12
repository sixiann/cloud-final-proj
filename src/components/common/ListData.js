import React, { useState } from 'react';
import Title from './Title';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Link, List } from '@mui/material';
import axios from 'axios';
import { getUser } from '../../service/AuthService';
import { CircularProgress } from '@mui/material';

const getUsername = () => {
  const user = getUser();
  if (user) {
    return user.username;
  } else {
    return '';
  }
}
function generateListItems(rows, isDashboard, getAllData) {
  if (rows && rows.length){
  return rows.map((row) => (
    <ListItem key={row.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={row.name} src={row.logo} />
      </ListItemAvatar>
      {
          row.su ?
          <ListItemText
            primary={row.name}
            secondary={row.short_description}
          />:
          <ListItemText
            primary={row.name}
            secondary={row.domain}
          />
        }
      {
        isDashboard ?
        <IconButton edge="end" aria-label="delete" onClick={()=>deleteItem(row, getAllData)}>
        <DeleteIcon />
      </IconButton> :<div></div>
      }

    </ListItem>
  ));
    }
}

function generateFive(rows, isDashboard, getAllData) {
  if (rows && rows.length){
    return rows.slice(0, 5).map((row) => (
      <ListItem key={row.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={row.name} src={row.logo} />
        </ListItemAvatar>
        {
          row.su ?
          <ListItemText
            primary={row.name}
            secondary={row.short_description}
          />:
          <ListItemText
            primary={row.name}
            secondary={row.domain}
          />
        }
         {
          isDashboard ?
          <IconButton edge="end" aria-label="delete" onClick={()=>deleteItem(row, getAllData)}>
          <DeleteIcon />
        </IconButton> :<div></div>
        }
      </ListItem>
    ))
  }
}

function deleteItem(row, getAllData){

  try {

    const requestBody = {
      username: getUsername(),
      feature: row.su ? "saved_startups" : "saved_investors",
      values: row.su ? [row.su] : [row.inv]
    }

    const url = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/public/users/delete';
    axios.post(url, requestBody)
      .then(response => {
        console.log("successefully deleted")
        getAllData()
        return;

      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
    throw error;
  }
}


function preventDefault(event) {
  event.preventDefault();
}

const SavedStartups = (props) => {
  const { title, isDashboard,  data, getAllData} = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Function to open the dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <React.Fragment>
      {
        isDashboard ? <Title>{title}</Title>: <div></div>
      }
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        {data && data.length ? generateFive(data, isDashboard, getAllData) : <div></div>}
        {data && data.length ?
        <Link color="primary" href="#" onClick={(event) => {
          event.preventDefault();
          handleOpenDialog();
        }} sx={{ mt: 3 }}>
          See More {title}
        </Link> : <CircularProgress />
        }
      </List>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>All {title}</DialogTitle>
        <DialogContent>
        {data && data.length ? generateListItems(data, isDashboard, getAllData) : <div>None Saved</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default SavedStartups
