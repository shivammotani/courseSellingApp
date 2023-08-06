import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

function Appbar(){
        const navigate = useNavigate();
        const [userEmail, setUserEmail] = useState(null);

        useEffect(() => {
                fetch("http://localhost:3000/admin/me",{
                                                method: "GET",
                                                headers:{
                                                        "Content-type": "application/json",
                                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                                }}).then((res) => {
                                                        return res.json()
                                                }).then((data) => {
                                                        if(data.username){
                                                                setUserEmail(data.username);
                                                        }
                                                        
                                                })
        },[])

        if(userEmail){
                return <div style={{display:"flex",
                        justifyContent:"space-between",
                        padding: 5}}>
                <div>
                        <Typography variant={'h6'}>CourseWorld</Typography>
                </div>
                
                <div style={{display: "flex"}}>
                        <div>{userEmail}</div>
                        <div style={{marginRight: 10}}>
                                <Button variant={'contained'} onClick={() => {
                                        localStorage.setItem("token", null)
                                        window.location = "/signup"
                                }}>Logout</Button>
                        </div>
                </div>
                
        </div>
        }

        return <div style={{display:"flex",
                        justifyContent:"space-between",
                        padding: 5}}>
                <div>
                        <Typography variant={'h6'}>CourseWorld</Typography>
                </div>
                
                <div style={{display: "flex"}}>
                        <div style={{marginRight: 10}}>
                                <Button variant={'contained'} onClick={() => {
                                        navigate("/signup")
                                }}>SignUp</Button>
                        </div>
                        <div>
                                <Button variant={'contained'} onClick={() => {
                                        navigate("/login")
                                }}>SignIn</Button>
                        </div>
                </div>
                
        </div>
}

export default Appbar;