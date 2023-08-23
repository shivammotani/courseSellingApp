import './App.css';
import Signup from './Components/Signup.jsx';
import Signin from './Components/Signin.jsx';
import Appbar from './Components/Appbar';
import Courses from './Components/Courses';
import Course from './Components/Course';
import AddCourse from './Components/AddCourse';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user.js";
import { Landing } from './Components/Landing';
import {useEffect} from "react";
import {BASE_URL} from "./config.js";
import axios from "axios";

function App() {
  return (
      <div style={{width: "100vm",
                  height: "100vh",
                  backgroundColor: "#eeeeee",
                  margin:-8}}>
        <RecoilRoot>
          <Router>
          <Appbar/>
          <InitUser />
            <Routes>
            <Route path="/addCourse" element = {<AddCourse />} />
              <Route path="/login" element = {<Signin />} />
              <Route path='/signup' element = {<Signup />} />
              <Route path='/courses' element = {<Courses />} />
              <Route path='/course/:selectedCourseId' element = {<Course/>} />
              <Route path='/' element = {<Landing />} />
              
            </Routes>
          </Router>
        </RecoilRoot>
      </div>
      
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })
          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {
        console.log(e)
          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App
