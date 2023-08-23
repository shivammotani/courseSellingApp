import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from "axios";

function AddCourse(){
        const[title, setTitle] = useState();
        const[description, setDescription] = useState();
        const[price, setPrice] = useState();
        const[imageLink, setImage] = useState();
        return <div>
                        <div style={{paddingTop:150,marginBottom:10,display:"flex", justifyContent:"center"}}>
                         <Typography variant={'h6'}>Welcome Back. Add the Course Details Below!</Typography> 
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                         <Card  style={{width:400, padding:20}}>
                                <TextField onChange={(event) => {setTitle(event.target.value)}} fullWidth="true" id="outlined-basic" label="Title" variant="outlined" />
                                <br /> <br />
                                <TextField onChange={(event) => {setDescription(event.target.value)}} fullWidth="true" id="outlined-basic" label="Description" variant="outlined" />
                                <br /> <br />
                                <TextField onChange={(event) => {setPrice(event.target.value)}} fullWidth="true" id="outlined-basic" label="Price" variant="outlined" />
                                <br /> <br />
                                <TextField onChange={(event) => {setImage(event.target.value)}} fullWidth="true" id="outlined-basic" label="Image Link" variant="outlined" />
                                <br /> <br />
                                <Button onClick= {async () => {
                                        await axios.post("http://localhost:3000/admin/courses", {
                                                title,
                                                description,
                                                price,
                                                imageLink,
                                                "published": true
                                        })
                                        alert("Course Added")
                                }}  variant="contained">Add Course</Button>
                         </Card>
                        </div>     
                </div>
}

export default AddCourse;