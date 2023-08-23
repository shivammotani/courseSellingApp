import { useEffect,useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses(){

        const [courseList, setCourse] = useState([]);
        useEffect(() => {
                const fetchData = async () => {
                const response = await axios.get("http://localhost:3000/admin/courses", {
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
                width:300,
                minHeight: 200
        }}>
                <Typography textAlign={"center"} variant = "h5">{props.course.title}</Typography>
                <Typography textAlign={"center"} variant = "subtitle1">{props.course.description}</Typography>
                <img src={props.course.imageLink} style={{width:250}} alt="" />
                <Typography variant = "subtitle1">Price: {props.course.price}</Typography>
                <div style ={{display: "flex", justifyContent: "center", marginTop:20}}>
                        <Button variant="contained" size = "large" onClick ={() => {
                                navigate("/course/" + props.course._id);
                        }}>Edit</Button>
                </div>
                
        </Card>
}
export default Courses