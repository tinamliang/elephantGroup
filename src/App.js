import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Post from './PostForm';

import { CardHeader, CircularProgress, ThemeProvider, createTheme, Typography, TextField, AppBar, Toolbar, CssBaseline, CardActions, Container, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import './courses';
import {Autocomplete, createFilterOptions } from '@mui/material';
import courses from './courses';
import './App.css';

// always send request to proxy no local machine
axios.defaults.baseURL = 'https://us-central1-elephant-f5f16.cloudfunctions.net/api';


function App() {
 
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Rubik',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        'Eczar',
      ].join(','),
    },
    palette: {
      background: {
        default: "#E9EAE0",
      }
    }
  });


  const [cards, setCards] = useState([])
  const [listingTextbook, setlistingTextbook] = useState(false)
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState('')
  const [empty, setEmpty] = useState(true)

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


  let handleSold = (event) => {

    setCards(cards.filter(card => card.id !== event.target.value))
    
    axios.delete(`/sold/${event.target.value}`)
    .then(()=> {
      console.log("Listing deleted")
    })


  }
  let searchCourse = () => {

    if (course !== '' && course !== null){
      setEmpty(false)
      setLoading(true)
      axios.get(`/textbooks/${course}`)
      .then((res)=> {
        setLoading(false)
        setCourse(null)
        setCards(res.data)
        
      })


    }
    
  }

  return (
    
    <ThemeProvider theme = {theme}>
    <CssBaseline />
    <AppBar style = {{ background: "#C51E3A"}} position = "relative">
      <Toolbar>
          <Grid
           // Add it here :)
          container
        >

          <Grid item xs={7} md={10}>
          <Typography variant = "h4" sx = {{fontFamily: 'Eczar', fontWeight: 'bold'}}>
          McGill 
        </Typography>
          </Grid>
          <Grid item xs={2} md={1}>
          <Button variant='h4' sx = {{marginRight: 6, fontFamily: 'sans-serif', fontSize: 20}} edge = "start" onClick = {handleSell}>
          Buy
        </Button>
          </Grid>
          <Grid item xs={2} md={1}>
          <Button variant='h4' sx = {{fontFamily: 'sans-serif', fontSize: 20, marginRight: 20}} edge = "start" onClick = {handleBuy}>
          Sell
        </Button>
          </Grid>
  
   
    

        </Grid>
      </Toolbar>

    </AppBar>

    {!listingTextbook ? (
      <main>
        <Typography variant = "h4" align = "center" sx={{mt: 4, mb: 2}}>Buy a Textbook</Typography>
          <div className ="container">
          <Container maxWidth = "sm">
              <div className ={"searchBar"}>
                <Autocomplete
                  style={{ maxWidth: 500 }}
                  freeSolo
                  filterOptions={filterOptions}
                  options={courses}
                  value={course}
                  getOptionLabel={option => option}
                
                  onChange={(_event, newCourse) => {
                    setCourse(newCourse)}}
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
                    <Button variant = "contained" color = "primary" onClick={searchCourse}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>

          {empty ? (
            <Fragment>

            </Fragment>
          ):
            <Fragment>


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
                        <Grid item xs={12} md={6} lg={4} key={card.id}>
                          <Card >
                            <CardHeader
                              title={card.title}
                              titleTypographyProps={{fontSize: 18}}
                              subheader={card.author}
                              subheaderTypographyProps={{fontSize: 15}}
                            />
                            <CardMedia 
                              component='img'
                              height='194'
                              image = {card.image}
                              title = "Textbook title"
                            />
                            <CardContent >
                              <Typography fontSize={16}>
                                  <b>Price: ${card.price} </b>  
                              </Typography>
                              <hr/>
                              <Typography  fontSize={15}>
                                <i>Contact: {card.contact}</i>
                              </Typography>

                            </CardContent>
                            <CardActions>
                              <Button size = "small" color = "primary" onClick={handleSold} value={card.id}>Sold</Button>
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
                    </Fragment>}

                  </Fragment>
                }
      </main>
    
    ) : (<Post />)}
    </ThemeProvider>
   
  );
  
}

export default App;