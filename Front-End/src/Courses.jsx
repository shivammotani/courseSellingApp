import { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

function Courses(){

        const [courseList, setCourse] = useState([]);
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
        return <div style={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
                {courseList.map(crc => {
                        return <Coursetorender course = {crc} />}
                )}
        </div>
}

export function Coursetorender(props){
        return <Card style = {{
                margin:10,
                width:300,
                minHeight: 200
        }}>
                <Typography textAlign={"center"} variant = "h5">{props.course.title}</Typography>
                <Typography textAlign={"center"} variant = "subtitle1">{props.course.description}</Typography>
                <img src={props.course.imageLink} style={{width:300}} alt="" />
                <Typography variant = "subtitle1">Price: {props.course.price}</Typography>
                
        </Card>
}
export default Courses