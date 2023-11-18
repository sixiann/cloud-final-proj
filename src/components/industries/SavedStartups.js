import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';



function createData(id, name, description, logo) {
  return { id, name, description, logo };
}

function generateListItems(rows) {
  return rows.map((row) => (
    <ListItem key={row.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={row.name} src={row.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={row.name}
        secondary={row.description}
      />
    </ListItem>
  ));
}

const rows = [
  createData(0, 'Catalyst Software', 'Catalyst is the world’s most intuitive Customer Success Platform. We integrate with all the tools you’re already using to provide one centralized view of customer data. Customer Success Managers can now easily prevent churn, increase product adoption, and align every stakeholder on a unified workflow to manage customers throughout their journey.'),
  createData(1, 'Studion', 'We believe healthy, empowered people lead to a better world. And it’s through Learning and Life Sciences that more people thrive. As these industries expand into digital formats, the challenge becomes reaching people where they are, and answering their ever-increasing demand for accessibility and engaging experiences. '),
  createData(2, 'Arthur', 'At Arthur, we are deeply passionate about building technology to make AI work for everyone. Arthur delivers on the full potential of equitable AI for enterprise customers through performance monitoring and optimization, explainability, and bias mitigation.'),
  createData(3, 'RocketReach', 'RocketReach is rare and unique; a startup that is in high-growth mode, already highly profitable, with a small team where you can make a gigantic impact. ')

]

function preventDefault(event) {
  event.preventDefault();
}

const Orders = (props) => {
  const { title } = props;
  return (

    <React.Fragment>
      {/* <Title>{title}</Title> */}
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          maxHeight: 450, // Set maximum height here
          overflow: 'auto', // Enable scrollbar when content exceeds maxHeight
        }}
      >
        {generateListItems(rows)}
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See More {title}
        </Link>
      </List>
    </React.Fragment>
  );
}

export default Orders
