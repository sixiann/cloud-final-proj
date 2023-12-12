import * as React from 'react';
import Card from '../common/Card'
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';


function generateListItems(rows) {
  console.log("ROWS", rows)
  return rows.map((row) => (
    // <ListItem key={row.id} alignItems="flex-start">

    <Card id={row.id} title={row.title} description={row.summary} image={row.image_url} link={row.article_link}/>
    // </ListItem>
  ));
}


const News = (props) => {

  return (

    <React.Fragment>
       {props && props.data && props.data.length ? generateListItems(props.data)
        : <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vh' // This sets the height of the box to the full viewport height
        }}
      >
        <CircularProgress />
      </Box>}

    </React.Fragment>
  );
}

export default News
