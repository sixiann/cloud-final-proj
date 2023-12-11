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

function generateListItems(rows, isDashboard) {
  if (rows && rows.length){
  return rows.map((row) => (
    <ListItem key={row.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={row.name} src={row.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={row.name}
        secondary={row.short_description}
      />
      {
        isDashboard ?
        <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton> :<div></div>
      }

    </ListItem>
  ));
    }
}

function generateFive(rows, isDashboard) {
  if (rows && rows.length){
    return rows.slice(0, 5).map((row) => (
      <ListItem key={row.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={row.name} src={row.logo} />
        </ListItemAvatar>
        <ListItemText
          primary={row.name}
          secondary={row.short_description}
        />
         {
          isDashboard ?
          <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton> :<div></div>
        }
      </ListItem>
    ))
  }


}


function preventDefault(event) {
  event.preventDefault();
}

const SavedStartups = (props) => {
  const { title, isDashboard,  data} = props;
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
        {data && data.length ? generateFive(data, isDashboard) : <div>None Saved</div>}
        {data && data.length ?
        <Link color="primary" href="#" onClick={(event) => {
          event.preventDefault();
          handleOpenDialog();
        }} sx={{ mt: 3 }}>
          See More {title}
        </Link> : <div></div>
        }
      </List>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>All {title}</DialogTitle>
        <DialogContent>
        {data && data.length ? generateListItems(data, isDashboard) : <div>None Saved</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default SavedStartups
