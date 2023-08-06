import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';


function Signin(){
        return <div>
                <div style={{paddingTop:150,marginBottom:10,display:"flex", justifyContent:"center"}}>
                        <Typography variant={'h6'}>Welcome to CourseWorld! Please Sign-In Below</Typography> 
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                        <Card  style={{width:400, padding:20}}>
                                <TextField fullWidth="true" id="outlined-basic" label="Email" variant="outlined" />
                                <br /> <br />
                                <TextField fullWidth="true" id="outlined-basic" label="Password" variant="outlined" type={"password"} />
                                <br /> <br />
                                <Button onClick={() => {
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
                                        })
                                }}  variant="contained">Sign In</Button>
                        </Card>
                </div>
        </div>
}

export default Signin;