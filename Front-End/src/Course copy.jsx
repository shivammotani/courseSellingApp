import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import { Typography,TextField,Button } from '@mui/material';
// import {Coursetorender} from './Courses';
import {atom, useRecoilState, useSetRecoilState} from 'recoil';

function Course(){
        let {selectedCourseId} = useParams();
        let crc = null;
        const setCourse = useSetRecoilState(coursesState);
        useEffect(() => {
                fetch("http://localhost:3000/admin/courses/",{
                                                method: "GET",
                                                headers:{
                                                        "Content-type": "application/json",
                                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                                }}).then((res) => {
                                                        return res.json()
                                                }).then((data) => {
                                                        setCourse(data.courses)
                                                })
        },[])

        // crc = courseList.find((courseObject) => courseObject.courseId == selectedCourseId)
        if(!crc) {
                return <div>Loading....</div>
        }

        return <div>
                <Coursetorender />
                <UpdateCourse courseId = {selectedCourseId}  />
        </div> 
       
}

function Coursetorender(props){
        const courseList = useRecoilState(coursesState);
        crc = courseList.find((courseObject) => courseObject.courseId == selectedCourseId)
        return <Card style = {{
                margin:10,
                width:300,
                minHeight: 200
        }}>
                <Typography textAlign={"center"} variant = "h5">{crc.title}</Typography>
                <Typography textAlign={"center"} variant = "subtitle1">{crc.description}</Typography>
                <img src={crc.imageLink} style={{width:300}} alt="" />
                <Typography variant = "subtitle1">Price: {crc.price}</Typography>
                
        </Card>
}

function UpdateCourse(props){
        
        const[title, setTitle] = useState();
        const[description, setDescription] = useState();
        const[price, setPrice] = useState();
        const[imageLink, setImage] = useState();
        return <div>                           
                        <div style={{paddingTop:150,marginBottom:10,display:"flex", justifyContent:"center"}}>
                         <Typography variant={'h6'}>Update the Course Details Below!</Typography> 
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
                                <Button onClick= {() => {
                                        fetch("http://localhost:3000/admin/courses/" + props.courseId,{
                                                method: "PUT",
                                                body: JSON.stringify({
                                                        title,
                                                        description,
                                                        price,
                                                        imageLink,
                                                        "published": true
                                                }),
                                                headers:{
                                                        "Content-type": "application/json",
                                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                                }}).then((res) => {
                                                        return res.json()
                                                }).then((data) => {
                                                        alert("Course Updated")
                                                })
                                }}  variant="contained">Update Course</Button>
                         </Card>
                        </div>     
                </div>
}

export default Course

const coursesState = atom({
        key: 'coursesState',
        default: ''
});