import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Onboarding = () => {
  return (
  <>
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="logo"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Welcome to DevSwipe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please fill out the form
        </Typography>
      </CardContent>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField id="outlined-basic" label="Age" variant="outlined" />
      <TextField id="outlined-basic" label="City" variant="outlined" />
      <TextField id="outlined-basic" label="Goals" variant="outlined" />
      <TextField id="outlined-basic" label="skills" variant="outlined" />
      <TextField id="outlined-basic" label="Profile picture link" variant="outlined" />
      <TextField id="outlined-basic" label="About me" variant="outlined" />
      <TextField id="outlined-basic" label="Experience" variant="outlined" />
      <TextField id="outlined-basic" label="github" variant="outlined" />
      <TextField id="outlined-basic" label="linkedin" variant="outlined" />
    

      <CardActions>
        <Button size="small">Submit</Button>
      </CardActions>
      </Card>
      </>
  )
}

export default Onboarding