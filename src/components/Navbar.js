import { useEffect } from 'react';
import {React,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
import { Notecontext } from '../context/Notestate';

export default function Navbar() {
  const {host} = useContext(Notecontext);
  const [userName,setuserName] = useState("Abdul Rafay");

    const getuser = async ()=>{
      const url = `${host}/api/auth/getuser`
          
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },           
      });
      const json = await response.json();
      setuserName(json.name.toString());
      // console.log(json)
    }
    useEffect(()=>{
      getuser();
    })
    

  const navigate = useNavigate();
  const clearlocalstorage = (e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">iNoteBook</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
                </li> */}
            </ul>
                <form className='d-flex align-items-center'>
                  <label className={`mx-2 p-2 ${localStorage.getItem("token")? "":"d-none"}`} style={{backgroundColor:"wheat"}}>{userName}</label>
                  <Link className={`btn btn-outline-success mx-2 ${localStorage.getItem("token")? "d-none":""}`}role="button" to='/login'>Login</Link>
                  <Link className={`btn btn-outline-warning ${localStorage.getItem("token")? "d-none":""}`} role="button" to='/signup'>SignUp</Link>
                  <Link className={`btn btn-outline-danger mx-2 ${localStorage.getItem("token")? "":"d-none"}`} role="button" onClick={clearlocalstorage}>Logout</Link>
                </form>
            </div>
        </div>
    </nav>
  )
}

export {Navbar};