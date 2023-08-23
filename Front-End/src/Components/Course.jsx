import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Typography,TextField,Button,Grid, Card } from '@mui/material';
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { BASE_URL } from "../config.js";
import {Loading} from "./Loading";
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, courseDescription, coursePrice, isCourseLoading, courseImage } from "../store/selectors/course";

function Course(){
        let {selectedCourseId} = useParams();
        const setCourse = useSetRecoilState(courseState);
        const courseLoading = useRecoilValue(isCourseLoading);
        useEffect(() => {
                const fetchData = async () => {
                const response = await axios.get(`${BASE_URL}/admin/course/`+ selectedCourseId, {
                                headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                      }
                });
                let data = response.data;
                if (data.course) {
                        setCourse({isLoading: false, course: data.course});
                }
                }
                fetchData();
              }, []);
        
              if (courseLoading) {
                return <Loading />
            }

        return <div>
                <GrayTopper ></GrayTopper>
                <Grid container>
                        <Grid item lg={8} md = {12} sm = {12}>
                         <UpdateCourse />
                        </Grid>
                        <Grid item lg={4} md = {12} sm = {12}>
                        <Coursetorender />
                        </Grid>
                </Grid>                
        </div> 
}

function GrayTopper(){
        const title = useRecoilValue(courseTitle);
        return <div style={{height:250, background: "#212121", top:0, width: "100vw", zIndex:0, marginBottom:-150}}>
                <div style={{height:250, display:"flex", justifyContent:"center", flexDirection: "column"}}>
                        <div>
                                <Typography style={{color:"white", fontWeight:600}} variant="h3" textAlign={"center"}>{title}</Typography>
                        </div>
                </div>
        </div>
}



function Coursetorender(){
        const title = useRecoilValue(courseTitle);
        const imageLink = useRecoilValue(courseImage);
        const price = useRecoilValue(coursePrice);
        const description = useRecoilValue(courseDescription);
        
        if(!title){
                return <div>Loading...</div>
        }
        return <div style={{display: "flex", marginTop:50, justifyContent: "center", width: "100%"}}>
                <Card style = {{
                        margin:10,
                        width:350,
                        minHeight: 150,
                        borderRadius: 20,
                        marginRight: 50,
                        paddingBottom: 15,
                        zIndex: 2
                }}>    
                        <img src={imageLink} style={{width:350, height:300}} alt="" />
                        <Typography paddingLeft={1} variant = "h5">{title}</Typography>
                        <Typography paddingLeft={1} variant = "subtitle2">{description}</Typography>
                        <Typography paddingLeft={1} variant="subtitle2"> Price: Rs {price} </Typography>
                        
                </Card>
        </div>
}

function UpdateCourse(){
        const [courseDetails, setCourse] = useRecoilState(courseState);
        const [title, setTitle] = useState(courseDetails.course.title);
        const [description, setDescription] = useState(courseDetails.course.description);
        const [image, setImage] = useState(courseDetails.course.imageLink);
        const [price, setPrice] = useState(courseDetails.course.price);

        useEffect(() => {
                // Update the local state when courseObject changes
                setTitle(courseDetails.course.title);
                setDescription(courseDetails.course.description);
                setPrice(courseDetails.course.price);
                setImage(courseDetails.course.imageLink);
            }, [courseDetails.course]);


        return <div style={{display:"flex", justifyContent:"center"}}>                           
                         <Card variant={"outlined"} style={{maxWidth:600, width:500, marginTop:100}}>
                           <div style={{padding: 20}}>
                                <Typography variant={'h6'} textAlign={"center"} style={{marginBottom: 10}}>Update the Course Details Below!</Typography> 
                                <TextField value = {title} onChange={(event) => {setTitle(event.target.value)}} fullWidth="true" id="outlined-basic" label="Title" variant="outlined" />
                                <br /> <br />
                                <TextField value = {description} onChange={(event) => {setDescription(event.target.value)}} fullWidth="true" id="outlined-basic" label="Description" variant="outlined" />
                                <br /> <br />
                                <TextField value = {price} onChange={(event) => {setPrice(event.target.value)}} fullWidth="true" id="outlined-basic" label="Price" variant="outlined" />
                                <br /> <br />
                                <TextField value = {image} onChange={(event) => {setImage(event.target.value)}} fullWidth="true" id="outlined-basic" label="Image Link" variant="outlined" />
                                <br /> <br />
                                <Button onClick= {async () => {
                                        await axios.put(`${BASE_URL}/admin/courses/` + courseDetails.course._id, {
                                                title,
                                                description,
                                                price,
                                                imageLink: image,
                                                "published": true
                                        },{
                                                headers: {
                                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                                      }
                                        })
                                        const updatedObject = {
                                                _id: courseDetails.course._id,
                                                title,
                                                description,
                                                price,
                                                imageLink:image
                                        }
                                        setCourse({course: updatedObject, isLoading: false});
                                }}  variant="contained">Update Course</Button>
                           </div>
                        
                         </Card>
                </div>
}

export default Course