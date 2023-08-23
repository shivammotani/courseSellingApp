import { useEffect,useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";

function Courses(){

        const [courseList, setCourse] = useState([]);
        useEffect(() => {
                const fetchData = async () => {
                const response = await axios.get(`${BASE_URL}/admin/courses/`, {
                                headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                      }
                });
                let data = response.data;
                if (data.courses) {
                        setCourse(data.courses)
                }
                }
                fetchData();
              }, []);

        return <div style={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
                {courseList.map(crc => {
                        return <Coursetorender course = {crc} />}
                )}
        </div>
}

export function Coursetorender(props){
        const navigate = useNavigate()
        return <Card style = {{
                margin:10,
                minWidth:300,
                minHeight: 300
        }}>     <div style ={{margin:20}}>
                        <Typography textAlign={"center"} variant = "h5">{props.course.title}</Typography>
                        <Typography textAlign={"center"} variant = "subtitle1">{props.course.description}</Typography>
                        <img src={props.course.imageLink} style={{width:300, minHeight:300, maxHeight:300, padding:10}} alt="" />
                        <Typography variant = "subtitle1">Price: {props.course.price}</Typography>
                        <div style ={{display: "flex", justifyContent: "center"}}>
                                <Button variant="contained" size = "large" onClick ={() => {
                                        navigate("/course/" + props.course._id);
                                }}>Edit</Button>
                        </div>
                </div>
                
        </Card>
}
export default Courses