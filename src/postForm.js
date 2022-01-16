import React, {useState} from 'react';
import { TextField, MenuItem, Button, Select, FormControl, InputLabel, Typography } from '@mui/material';
import courses from './courses';

function Post() {

    const [submitForm, setSubmitForm] = useState(false)

    const[title, setTitle] = useState(null);
    const[author, setAuthor] = useState(null);
    const[price, setPrice] = useState(null);
    const[contact, setContact] = useState(null);

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

    return (
      
        <div>

            <Typography variant = "h4" align = "center" sx = {{mt: 6, mb: -5}}>Post your own textbook using this form! </Typography>

            <TextField required onChange = {handleChange} sx={{mt: 8, mb: 1, ml: 80}} value = {title} id = "title" label = "Title" type = "text"></TextField>
            
            <TextField required onChange = {handleChangeAuthor} sx={{mt: 18, ml: -28}} value = {author} id = "author" label = "Author" type = "text"></TextField>
 
            <TextField required onChange = {handleChangePrice} sx={{mt: 28, ml: -28}} value = {price} id = "price" label = "Price" type = "number"></TextField>

            <TextField required onChange = {handleChangeContact} sx={{mt: 38, ml: -28}} value = {contact} id = "contact" label = "Contact" type = "text"></TextField>

            <FormControl sx={{ m: 1, minWidth: 120 }}>

              <InputLabel sx={{mt: 48, ml: -29}}>Course Code</InputLabel>
              <Select sx={{mt: 48, ml: -29}} id ="course" label="Course Code">
                {courses.map(course => (
                  <MenuItem value = {course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button sx={{mt: 50, ml: -46}}>
            <input type = "file" id = "picture" label = "image"/>
            </Button>

            <Button sx={{mt: 68, ml: -33}} variant = "contained" onClick = {submitted}>Submit</Button>

            {submitForm ? (<h3>Form Submitted!</h3>) : (<h3>Sorry! There was a mistake</h3>)};

        </div>
        
        
    )
}

export default Post;