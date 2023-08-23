import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import { Typography,TextField,Button } from '@mui/material';
import {Coursetorender} from './Courses';
import axios from "axios";

function Course(){
        let {selectedCourseId} = useParams();
        const [courseList, setCourse] = useState();
        
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

        if(!courseList) {
                return <div>Loading....</div>
        }

        return <div>
                <Coursetorender course = {courseList} />
                <UpdateCourse courseid = {selectedCourseId}  setCourse = {setCourse} courseList = {courseList}/>
        </div> 
       
        // <Card style = {{
        //         margin:10,
        //         width:300,
        //         minHeight: 200
        // }}>     
        //         <Typography textAlign={"center"} variant = "h5">{crc.title}</Typography>
        //         <Typography textAlign={"center"} variant = "subtitle1">{crc.description}</Typography>
        //         <img src={crc.imageLink} style={{width:300}} alt="" />
        //         <Typography variant = "subtitle1">Price: {crc.price}</Typography>
                
        // </Card>
}

function UpdateCourse(props){
        const[title, setTitle] = useState(props.courseList.title);
        const[description, setDescription] = useState(props.courseList.description);
        const[price, setPrice] = useState(props.courseList.price);
        const[imageLink, setImage] = useState(props.courseList.imageLink);
        return <div>   

                        <div style={{paddingTop:150,marginBottom:10,display:"flex", justifyContent:"center"}}>
                         <Typography variant={'h6'}>Update the Course Details Below!</Typography> 
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                         <Card  style={{width:400, padding:20}}>
                                <TextField value = {title} onChange={(event) => {setTitle(event.target.value)}} fullWidth="true" id="outlined-basic" label="Title" variant="outlined" />
                                <br /> <br />
                                <TextField value = {description} onChange={(event) => {setDescription(event.target.value)}} fullWidth="true" id="outlined-basic" label="Description" variant="outlined" />
                                <br /> <br />
                                <TextField value = {price} onChange={(event) => {setPrice(event.target.value)}} fullWidth="true" id="outlined-basic" label="Price" variant="outlined" />
                                <br /> <br />
                                <TextField value = {imageLink} onChange={(event) => {setImage(event.target.value)}} fullWidth="true" id="outlined-basic" label="Image Link" variant="outlined" />
                                <br /> <br />
                                <Button onClick= {async () => {
                                        await axios.put("http://localhost:3000/admin/courses/" + props.courseid, {
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
                                        props.setCourse(updatedObject)
                                                
                                }}  variant="contained">Update Course</Button>
                         </Card>
                        </div>     
                </div>
}

export default Course