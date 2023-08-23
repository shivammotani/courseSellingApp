import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isUserLoading } from "../store/selectors/isUserLoading";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail"


function Appbar(){
        const navigate = useNavigate()
        const userLoading = useRecoilValue(isUserLoading);
        const userEmail = useRecoilValue(userEmailState);
        const setUser = useSetRecoilState(userState);

        if (userLoading) {
                return <></>
            }

        if(userEmail){
                return <div style={{display:"flex",
                                justifyContent:"space-between",
                                padding: 5}}>
                        <div>
                        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                                navigate("/")
                                }}>
                                <Typography variant={"h6"}>Course World</Typography>
                        </div>

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
                                                setUser({
                                                        isLoading: false,
                                                        userEmail: null
                                                    })
                                                    navigate('/')
                                        }}>Logout</Button>
                                </div>
                        </div>
                
                </div>
        }

        return <div style={{display:"flex",
                        justifyContent:"space-between",
                        padding: 5}}>
                <div>
                        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                                navigate("/")
                                }}>
                                <Typography variant={"h6"}>Course World</Typography>
                        </div>
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