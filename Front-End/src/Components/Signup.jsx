import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography, Card } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import { BASE_URL } from "../config.js";

   
function Signup(){

        const[email, setEmail] = useState("")
        const[password, setPAssword] = useState("")
        const navigate = useNavigate()
        const setUser = useSetRecoilState(userState)


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

                                <Button  onClick={async () => {
                                        const response = await axios.post(`${BASE_URL}/admin/signup`, {
                                                "username" : email,
                                                "password" : password
                                        })
                                        let data = response.data;
                                        localStorage.setItem("token", data.token);
                                        setUser({userEmail: email, isLoading: false})
                                        navigate("/courses")
                                }} variant="contained" >Sign Up</Button>
                        </Card>
                </div>
        </div>
}

export default Signup;