import React, { Fragment, useState } from 'react';

import { CardHeader, CircularProgress, Typography, TextField, AppBar, Toolbar, CssBaseline, CardActions, Container, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import './courses';
import {Autocomplete, createFilterOptions } from '@mui/material';
import courses from './courses';
const cards = []


function App() {
 
  const [listingTextbook, setlistingTextbook] = useState(false)
  const [loading, setLoading] = useState(false)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
  });

  let handleSell = () => {
    setlistingTextbook(false);
  }

  let handleBuy = () => {
    setlistingTextbook(true);
  }

  return (
    <>
    <CssBaseline />
    <AppBar style = {{ background: "#C51E3A"}} position = "relative">
      <Toolbar>
        <Typography variant = "h4" >
          McGill 
        </Typography>
        <Button variant='h4' onClick = {handleSell}>
          Buy
        </Button>
        <Button variant='h4' onClick = {handleBuy}>
          Sell
        </Button>
      </Toolbar>
    </AppBar>

    {!listingTextbook ? (
      <main>
        <Typography variant = "h4" align = "center" sx={{mt: 2, mb: 1}}>Buy a Textbook</Typography>
          <div className ="container">
            <Container maxWidth = "sm">
              <div className = {"searchBar"}>
                <Autocomplete
                  style={{ maxWidth: 500 }}
                  freeSolo
                  filterOptions={filterOptions}
                  options={courses}
                  renderInput={(params) => (
                <TextField {...params}
                  
                  variant="outlined"
                  label="Course Code"
                />)}
                />
              </div>
              <div className = "buttons" style={{alignItems: 'center'}}>
                <Grid container justifyContent={'center'} sx={{mt: 2}}>
                  <Grid item>
                    <Button variant = "contained" color = "primary">
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>

            {loading ? (
         
              <Grid container justifyContent={'center'} sx={{mt: 5}}>
                <Grid item>
                  <CircularProgress/>
                </Grid>
              </Grid>
     
            ): 
              <Fragment>
                {cards.length > 0 ? (

                              
                <Container sx={{alignItems: 'center', mt: 4, mb: 7}}>
                <Grid container spacing = {4}>
                {cards.map((card, i) => (
                  <Grid item xs={12} md={6} lg={4} key={i}>
                    <Card >
                      <CardHeader
                        title="Shrimp and Chorizo Paella"
                        titleTypographyProps={{fontSize: 18}}
                        subheader="John Doe"
                        subheaderTypographyProps={{fontSize: 15}}
                      />
                      <CardMedia 
                        component='img'
                        height='194'
                        image = "https://apod.nasa.gov/apod/image/2201/PIA19048europa1024.jpg"
                        title = "Image title"
                      />
                      <CardContent >
                        <Typography fontSize={16}>
                            <b>Price: </b>  
                        </Typography>
                        <hr/>
                        <Typography  fontSize={15}>
                          <i>Contact: </i>
                        </Typography>

                      </CardContent>
                      <CardActions>
                        <Button size = "small" color = "primary">Sold</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  ))}

                </Grid>

                </Container>
                ): (
                <div className = "buttons" style={{alignItems: 'center'}} sx={{mb: 20, mt: 5}}>
                    <Grid container justifyContent={'center'} sx={{mt: 2}}>
                      <Grid item>
                        <Card style={{maxWidth: 400}}>
                            <CardHeader
                              title="No Textbooks Found for this Course"
                              titleTypographyProps={{fontSize: 18}}
                            />
                        </Card>
                      </Grid>
                    </Grid>
                </div>
                )}
              </Fragment>
            

      }</main>
    
    ) : (<h1>No!</h1>)}
    
    </>
  );
}

export default App;