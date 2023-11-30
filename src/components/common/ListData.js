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


function createData(id, name, description, logo) {
  return { id, name, description, logo };
}

function generateListItems(rows, isDashboard) {
  return rows.map((row) => (
    <ListItem key={row.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={row.name} src={row.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={row.name}
        secondary={row.description}
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

function generateFive(rows, isDashboard) {
  return rows.slice(0, 5).map((row) => (
    <ListItem key={row.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={row.name} src={row.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={row.name}
        secondary={row.description}
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


function preventDefault(event) {
  event.preventDefault();
}

const SavedStartups = (props) => {
  const { title, isDashboard } = props;
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
        {generateFive(rows, isDashboard)}
        <Link color="primary" href="#" onClick={(event) => {
          event.preventDefault();
          handleOpenDialog();
        }} sx={{ mt: 3 }}>
          See More {title}
        </Link>
      </List>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>All {title}</DialogTitle>
        <DialogContent>
        {generateListItems(rows, isDashboard)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const rows = [
  createData(0, 'Catalyst Software', 'Catalyst is the world’s most intuitive Customer Success Platform. We integrate with all the tools you’re already using to provide one centralized view of customer data. Customer Success Managers can now easily prevent churn, increase product adoption, and align every stakeholder on a unified workflow to manage customers throughout their journey.'),
  createData(1, 'Studion', 'We believe healthy, empowered people lead to a better world. And it’s through Learning and Life Sciences that more people thrive. As these industries expand into digital formats, the challenge becomes reaching people where they are, and answering their ever-increasing demand for accessibility and engaging experiences. '),
  createData(2, 'Arthur', 'At Arthur, we are deeply passionate about building technology to make AI work for everyone. Arthur delivers on the full potential of equitable AI for enterprise customers through performance monitoring and optimization, explainability, and bias mitigation.'),
  createData(3, 'RocketReach', 'RocketReach is rare and unique; a startup that is in high-growth mode, already highly profitable, with a small team where you can make a gigantic impact. '),

  createData(0, 'Catalyst Software', 'Catalyst is the world’s most intuitive Customer Success Platform. We integrate with all the tools you’re already using to provide one centralized view of customer data. Customer Success Managers can now easily prevent churn, increase product adoption, and align every stakeholder on a unified workflow to manage customers throughout their journey.'),
  createData(1, 'Studion', 'We believe healthy, empowered people lead to a better world. And it’s through Learning and Life Sciences that more people thrive. As these industries expand into digital formats, the challenge becomes reaching people where they are, and answering their ever-increasing demand for accessibility and engaging experiences. '),
  createData(2, 'Arthur', 'At Arthur, we are deeply passionate about building technology to make AI work for everyone. Arthur delivers on the full potential of equitable AI for enterprise customers through performance monitoring and optimization, explainability, and bias mitigation.'),
  createData(3, 'RocketReach', 'RocketReach is rare and unique; a startup that is in high-growth mode, already highly profitable, with a small team where you can make a gigantic impact. ')

]

export default SavedStartups
