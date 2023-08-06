import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';


function Signup(){

        const[email, setEmail] = useState()
        const[password, setPAssword] = useState()


        return <div>

                <div style={{paddingTop:150,marginBottom:10,display:"flex", justifyContent:"center"}}>
                        <Typography variant={'h6'}>Welcome to CourseWorld! Please Sign-Up Below</Typography> 
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                        <Card  style={{width:400, padding:20}}>

                                <TextField onChange={(event) =>{
                                        setEmail(event.target.value)
                                }} fullWidth="true" id="outlined-basic" label="Email" variant="outlined" />
                                <br /> <br />

                                <TextField onChange={(event) =>{
                                        setPAssword(event.target.value)
                                }} fullWidth="true" id="outlined-basic" label="Password" variant="outlined" type={"password"} />
                                <br /> <br />

                                <Button  onClick={() => {
                                        fetch("http://localhost:3000/admin/signup",{
                                        method: "POST",
                                        body: JSON.stringify({
                                                "username" : email,
                                                "password" : password
                                        }),
                                        headers:{
                                                "Content-type": "application/json"
                                        }}).then((res) => {
                                                return res.json()
                                        }).then((data) => {
                                                localStorage.setItem("token", data.token);
                                                window.location = "/"
                                        })
                                }} variant="contained" >Sign Up</Button>
                        </Card>
                </div>
        </div>
}

export default Signup;