import React, { useState } from 'react';

import { Typography, TextField, AppBar, Toolbar, CssBaseline, CardActions, Container, Grid, Button, Card, CardMedia, CardContent } from '@material-ui/core';
import './courses';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import courses from './courses';
import useStyles from './style';
const cards = [1, 2, 3]


function App() {
  const classes = useStyles()

  const [listingTextbook, setlistingTextbook] = useState(false)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
  });

  let handleClick = () => {
    setlistingTextbook(true);
  }

  return (
    <>
    <CssBaseline />
    <AppBar style = {{ background: "#C51E3A"}} position = "relative">
      <Toolbar>
        <Typography variant = "h4">
          McGill 
        </Typography>
        </Toolbar>
    </AppBar>

    <h1 style = {{textAlign: "center", marginTop: "20px"}}>Sell Textbooks</h1>
      <div className = {classes.container}>
        <Container maxWidth = "sm">
          <Autocomplete
            style={{ width: 500 }}
            freeSolo
            filterOptions={filterOptions}
            options={courses}
            renderInput={(params) => (
              <div className = {classes.searchBar}>
              <TextField {...params}
                variant="outlined"
                label="Course Code"
              />
              </div>
            )}
          />
            <div className = {classes.buttons}>
            <Grid container spacing = {2} justify = "center">
              <Grid item>
              <Button variant = "contained" className = {classes.button} onClick = {handleClick}>Search</Button>
              </Grid>
            </Grid>
            </div>
        </Container>
      </div>

    {!listingTextbook ? (<main>

      <Container className = {classes.cardGrid} maxWidth = "md">

        <Grid container spacing = {4}>
          {cards.map(() => (
            <Grid item>
              <Card className = {classes.card}>
                <CardMedia 
                    className = {classes.cardMedia}
                    image = "https://source.unsplash.com/random"
                    title = "Image title"
                />
                <CardContent className = {classes.cardContent}>
                  <Typography>
                    This is a posting with some content
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size = "small" color = "primary">Review</Button>
                  <Button size = "small" color = "primary">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
            ))}
        </Grid>

      </Container>
    </main>) : (<h1>No!</h1>)}
    
    </>
  );
}

export default App;
