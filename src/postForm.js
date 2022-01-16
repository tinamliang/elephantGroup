import React, {useState} from 'react';
import { TextField, Container, Grid, MenuItem, Button, Select, FormControl, InputLabel, Typography } from '@mui/material';
import courses from './courses';
import {Autocomplete, createFilterOptions } from '@mui/material';

function Post() {

    const [submitForm, setSubmitForm] = useState(false)

    const[title, setTitle] = useState(null);
    const[author, setAuthor] = useState(null);
    const[price, setPrice] = useState(null);
    const[contact, setContact] = useState(null);
    const[imageUrl, setImageUrl] = useState(null);

    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: option => option,
    });

    let submitted = () => {
        setSubmitForm(true);
        setTitle("");
        setAuthor("");
        setPrice("");
        setContact("");
    }

    let handleChange = event => {
      setTitle(event.target.value);
    };

    let handleChangeAuthor = event => {
      setAuthor(event.target.value);
    };

    let handleChangePrice = event => {
      setPrice(event.target.value);
    };

    let handleChangeContact = event => {
      setContact(event.target.value);
    };

    let handleImage = event => {
      setImageUrl(event.target.value);
    }

    return (
      
        <div>

            <Typography variant = "h4" align = "center" sx = {{mt: 6, mb: -5}}>Post your own textbook using this form! </Typography>

            <Grid>
              <Grid item>
            <TextField required onChange = {handleChange} sx={{mt: 8, mb: 1, ml: 80}} value = {title} id = "title" label = "Title" type = "text"></TextField>
              </Grid>
            <TextField required onChange = {handleChangeAuthor} sx={{mt: 18, ml: -28}} value = {author} id = "author" label = "Author" type = "text"></TextField>
              <Grid item>
            <TextField required onChange = {handleChangePrice} sx={{mt: 28, ml: -28}} value = {price} id = "price" label = "Price" type = "number"></TextField>
              </Grid>
            <TextField required onChange = {handleChangeContact} sx={{mt: 38, ml: -28}} value = {contact} id = "contact" label = "Contact" type = "text"></TextField>
              <Grid item>
            <FormControl sx={{ m: 1, minWidth: 400 }}>

              <Autocomplete
                  style={{ maxWidth: 450 }}
                  freeSolo
                  filterOptions={filterOptions}
                  options={courses}
                  renderInput={(params) => (
                <TextField {...params}
                  sx={{mt: 48, ml: -29}}

                  variant="outlined"
                  label="Course Code"
                />)}
                />
            
            <Button sx={{mt: 5, ml: -76}} onClick = {handleImage}>
            <input type = "file" id = "picture" label = "image"/>
            </Button>

            <Button sx={{mt: 4, ml: -29}} variant = "contained" onClick = {submitted}>Submit</Button>
            
            </FormControl>
            </Grid>          
            </Grid>
            {submitForm ? (<h3>Form Submitted!</h3>) : (<h3>Sorry! There was a mistake</h3>)};

        </div>
        
        
    )
}

export default Post;