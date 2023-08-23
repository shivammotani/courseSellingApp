import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import { Typography,TextField,Button,Grid } from '@mui/material';
// import {Coursetorender} from './Courses';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";

function Course(){
        let {selectedCourseId} = useParams();
        console.log("Course main rendered")
        const setCourse = useSetRecoilState(coursesState);
        useEffect(() => {
                const fetchData = async () => {
                const response = await axios.get("http://localhost:3000/admin/course/" + selectedCourseId, {
                                headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                      }
                });
                let data = response.data;
                if (data.course) {
                        setCourse(data.course)
                }
                }
                fetchData();
              }, []);

        return <div>
                <GrayTopper ></GrayTopper>
                <Grid container>
                        <Grid item lg={8} md = {12} sm = {12}>
                         <UpdateCourse courseId = {selectedCourseId}  />
                        </Grid>
                        <Grid item lg={4} md = {12} sm = {12}>
                        <Coursetorender />
                        </Grid>
                </Grid>                
        </div> 
}

function GrayTopper(){
        const courseObject = useRecoilValue(coursesState);
        return <div style={{height:250, background: "#212121", top:0, width: "100vw", zIndex:0, marginBottom:-150}}>
                <div style={{height:250, display:"flex", justifyContent:"center", flexDirection: "column"}}>
                        <div>
                                <Typography style={{color:"white", fontWeight:600}} variant="h3" textAlign={"center"}>{courseObject.title}</Typography>
                        </div>
                </div>
        </div>
}



function Coursetorender(){
        const courseObject = useRecoilValue(coursesState);
        if(!courseObject){
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
                        <img src={courseObject.imageLink} style={{width:350, height:300}} alt="" />
                        <Typography paddingLeft={1} variant = "h5">{courseObject.title}</Typography>
                        <Typography paddingLeft={1} variant = "subtitle2">{courseObject.description}</Typography>
                        <Typography paddingLeft={1}  variant = "subtitle1">Price: {courseObject.price}</Typography>
                        
                </Card>
        </div>
}

function UpdateCourse(props){
        const [courseList, setCourse]  = useRecoilState(coursesState);
        console.log(courseList)
        const[title, setTitle] = useState('');
        const[description, setDescription] = useState('');
        const[price, setPrice] = useState('');
        const[imageLink, setImage] = useState('');

        useEffect(() => {
                // Update the local state when courseObject changes
                setTitle(courseList.title);
                setDescription(courseList.description);
                setPrice(courseList.price);
                setImage(courseList.imageLink);
            }, [courseList]);


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
                                <TextField value = {imageLink} onChange={(event) => {setImage(event.target.value)}} fullWidth="true" id="outlined-basic" label="Image Link" variant="outlined" />
                                <br /> <br />
                                <Button onClick= {async () => {
                                        await axios.put("http://localhost:3000/admin/courses/" + props.courseId, {
                                                title,
                                                description,
                                                price,
                                                imageLink,
                                                "published": true
                                        },{
                                                headers: {
                                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                                      }
                                        })
                                        const updatedObject = {
                                                title,
                                                description,
                                                price,
                                                imageLink
                                        }
                                        setCourse(updatedObject)
                                }}  variant="contained">Update Course</Button>
                           </div>
                        
                         </Card>
                </div>
}

export default Course

const coursesState = atom({
        key: 'coursesState',
        default: {}
});