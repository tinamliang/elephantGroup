
import React, {useState, Fragment} from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Select, FormControl, InputLabel, Typography, Grid, Box, Container, CircularProgress } from '@mui/material';
import {Autocomplete, createFilterOptions } from '@mui/material';
import courses from './courses';


function Post() {

    const [submitForm, setSubmitForm] = useState(false)
    const [error, setError] = useState(false)
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[price, setPrice] = useState('');
    const[contact, setContact] = useState('');
    const[imageUrl, setImageUrl] = useState('');
    const[course, setCourse] = useState('');
    const[loading, setLoading] = useState(false)
    const [imageOption, setImageOption] = useState(true)

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option,
      });

    let submitted = () => {

        setError(false)
        setSubmitForm(false)


        if (title !== null && title !== '' && author !== null && author !== '' && price !== null && price !== ''
            && contact !== null && contact !== '' && imageUrl !== null && imageUrl !== '' && course !== null && course !== ''
        ) {

            setLoading(true)
           
            let listing = {
                image: imageUrl, 
                author: author,
                contact: contact, 
                course: course, 
                price: price, 
                title: title,
                image: imageUrl
            }

            axios.post('/list', listing)
            .then(res => {
                
                //const config = { headers: { 'content-type': `multipart/form-data; boundary=${imageUrl._boundary}` }};
                setTitle('');
                setAuthor('');
                setPrice('');
                setContact('');
                setImageUrl('');
                setCourse('')
                setLoading(false)
                setSubmitForm(true)
            
                // axios.post(`/image`, imageUrl, config)
                // .then((res)=> {
                   
                //    
                // })
                // .catch(err => {
                  
                //     setLoading(false)
                //     setError(true)
                // })
            })
            .catch(err => {
               
                setLoading(false)
                setError(true)
            })

        }
        
    }
    
    let handleChangeImage = (event) => {
        setImageUrl(event.target.value)
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
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('image', image, image.name);
        //setImageUrl(formData);
        // axios.defaults.headers = { "Content-Type": "multipart/form-data" }
        // axios.post(`/image`,formData)
        // .then((res)=> {
        //     console.log(res.data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    return (
      
        <div>

            <Typography variant = "h4" align = "center" sx = {{mt: 6, mb: -5, mx: 5}}> New Textbook Listing</Typography>

            <Grid container align="center">

                <Grid item xs={12} sx={{mt: 8, mx: 5}}>
                    <TextField required onChange = {handleChange}  value = {title} id = "title" label = "Title" type = "text"></TextField>
                </Grid>
                <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                    <TextField required onChange = {handleChangeAuthor} value = {author} id = "author" label = "Author" type = "text"></TextField>
                </Grid>
                <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                    <TextField required onChange = {handleChangePrice} value = {price} id = "price" label = "Price" type = "number"></TextField>
                </Grid>

                <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                    <TextField required onChange = {handleChangeContact} value = {contact} id = "contact" label = "Contact" type = "text"></TextField>
                </Grid>

                <Container maxWidth = "sm" sx={{mt: 5}}>
                            <div className ={"searchBar"} style={{alignItems: 'center'}}>
                            <Autocomplete
                                autoHighlight
                                freeSolo
                                style={{ minWidth: 200, maxWidth: 470}}
                                filterOptions={filterOptions}
                                value={course}
                                options={courses}
                                onChange={(_event, newCourse) => {
                                    setCourse(newCourse)}}
                                renderInput={(params) => (
                            <TextField {...params}
                                variant="outlined"
                                label="Course Code"
                            />)}
                            />
                            </div>
                        </Container>
                {
                    imageOption ? (
                        <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                            <TextField required onChange = {handleChangeImage} value = {imageUrl} id = "text" label = "Image URL" type = "text"></TextField>
                        </Grid>
                    ) : (

                        <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                            <Button>
                                <input type = "file" id = "picture" label = "image"  onChange = {handleImage}/>
                            </Button>
                        </Grid>
                      
                    )
                }

             
                

                <Grid item xs={12} sx={{mt: 4, mx: 5}}>
                    <Button  variant = "contained" onClick = {submitted}>
                    
                    {
                        loading? (
                            <CircularProgress color='warning' size={35} /> 
                        ): (
                            'Submit'
                        )
                    }
               
                        
                    </Button>
                </Grid>
 
                <Grid item xs={12} sx={{mt: 4}}>
                {submitForm ? (<h3>Textbook Listed</h3>) : <Fragment></Fragment>}
                {error ? (<h3>Sorry! An Error Occured</h3>) : <Fragment></Fragment>}
                </Grid>


           
            
            </Grid>
        </div>
        
        
    )
}

export default Post;