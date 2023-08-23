import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios";

function Appbar(){
        const navigate = useNavigate();
        const [userEmail, setUserEmail] = useState(null);

        useEffect(() => {
                const fetchData = async () => {
                const response = await axios.get("http://localhost:3000/admin/me", {
                        headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token"),
                              },
                });
                let data = response.data;
                if (data.username) {
                        setUserEmail(data.username);
                }
                }
                fetchData();
              }, []);

        if(userEmail){
                return <div style={{display:"flex",
                        justifyContent:"space-between",
                        padding: 5}}>
                <div>
                        <Typography variant={'h6'}>CourseWorld</Typography>
                </div>
                
                <div style={{display: "flex"}}>
                        <Typography variant = "h6" paddingRight={2}>Welcome Back! {userEmail}</Typography>
                        <div style={{marginRight: 10}}>
                                <Button variant={'contained'} onClick={() => {
                                        navigate("/addCourse");
                                }}>Add Course</Button>
                        </div>
                        <div style={{marginRight: 10}}>
                                <Button variant={'contained'} onClick={() => {
                                        navigate("/courses");
                                }}>Courses</Button>
                        </div>
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
                                }}>LogIn</Button>
                        </div>
                </div>
                
        </div>
}

export default Appbar;