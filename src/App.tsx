import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import StudentHome from './pages/studentHome'
import TeacherHome from './pages/teacherHome'

function App() {

  return (
    <>
       <Routes>
        <Route path="/student" element={ <StudentHome /> } />
        <Route path="/teacher" element={ <TeacherHome /> } />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
