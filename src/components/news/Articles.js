import * as React from 'react';
import Card from '../common/Card'

function createData(id, title, description, image) {
  return { id, title, description, image };
}

function generateListItems(rows) {
  return rows.map((row) => (
    <Card id={row.id} title={row.title} description={row.description} image={row.image} link={'https://www.google.com'}/>
      ))
}

const rows = [
  createData(0, 'Telegram is still leaking user IP addresses to contacts', 'November 17, 2023', 'icon1.png'),
  createData(1, 'OpenAI debates when to release its AI-generated image detector', 'November 17, 2023', 'icon2.png'),
  createData(2, 'Photon’s app for pro photographers lets you shoot and save to an external drive', 'November 17, 2023', 'icon3.png'),
  createData(3, 'Google Meet now lets you apply a skin-smoothing effect with its new portrait touch-up mode', 'November 17, 2023', 'icon4.png'),
  createData(4, 'Google Meet now lets you apply a skin-smoothing effect with its new portrait touch-up mode', 'November 17, 2023', 'icon4.png')

]

const Articles = (props) => {
  return (
    <React.Fragment>
        {generateListItems(rows)}
    </React.Fragment>
  );
}

export default Articles
