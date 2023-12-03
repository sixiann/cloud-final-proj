import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';


const card = (props) => {
  const {image, title, description, link} = props

  const handleCardClick = () => {
    window.location.href = link;
  };

  return (
    <Grid item xs={6} sm={3}>
    <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  );
}

export default card
