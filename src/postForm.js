import React from 'react';
import { TextField, Button, Select, FormControl, InputLabel, Typography } from '@mui/material';
import courses from './courses';

function Post() {

    return (
      
        <div>

            <Typography variant = "h4" align = "center" sx = {{mt: 6, mb: -5}}>Upload your own textbook using this form! </Typography>

            <TextField sx={{mt: 8, mb: 1, ml: 80}} id = "title" label = "Title" type = "text"></TextField>
            

            <TextField sx={{mt: 18, ml: -28}} id = "author" label = "Author" type = "text"></TextField>
 
            <TextField sx={{mt: 28, ml: -28}} id = "price" label = "Price" type = "number"></TextField>

            <TextField sx={{mt: 38, ml: -28}} id = "contact" label = "Contact" type = "text"></TextField>

            <FormControl sx={{ m: 1, minWidth: 120 }}>

              <InputLabel sx={{mt: 48, ml: -29}}>Course Code</InputLabel>
              <Select sx={{mt: 48, ml: -29}} id ="course" label="Course Code">
                {courses.map(course => (
                  <option key = {course} value = {course}>{course}</option>
                ))}
              </Select>
            </FormControl>
            
            <Button sx={{mt: 60, ml: -46}}>
            <input type = "file" id = "picture" label = "image"/>
            </Button>
        </div>
        
        
    )
}

export default Post;