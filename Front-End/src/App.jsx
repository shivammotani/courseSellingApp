import './App.css';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Appbar from './Appbar';
import Courses from './Courses';
import Course from './Course';
import AddCourse from './AddCourse';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

function App() {
  return (
      <div style={{width: "100vm",
                  height: "100vh",
                  backgroundColor: "#eeeeee",
                  margin:-8}}>
        {/* <RecoilRoot> */}
          <Router>
          <Appbar></Appbar>
            <Routes>
            <Route path="/addCourse" element = {<AddCourse />} />
              <Route path="/login" element = {<Signin />} />
              <Route path='/signup' element = {<Signup />} />
              <Route path='/courses' element = {<Courses />} />
              <Route path='/course/:selectedCourseId' element = {<Course/>} />
              
            </Routes>
          </Router>
        {/* </RecoilRoot> */}
      </div>
      
  )
}

export default App
