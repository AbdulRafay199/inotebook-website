import "./App.css";
import Mainarea from "./components/Mainarea";
import Navbar from "./components/Navbar";
import Notestate from "./context/Notestate";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {


  return (
    <>
    <Notestate>
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Mainarea/>}/>
          <Route path="/login" element={<Login/>}/>           
          <Route path="/signup" element={<Signup/>}/>          
        </Routes>
    </Router>
    </Notestate>
    </>
    
  );
}

export default App;
