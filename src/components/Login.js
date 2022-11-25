import React,{useState,useContext} from 'react'
import {useNavigate } from 'react-router-dom';
import { Notecontext } from '../context/Notestate';

export default function Login() {
    const {host} = useContext(Notecontext);
    const navigate = useNavigate();
    const[val, setval] = useState({email:"", password:""});
    const getvalue = (e)=>{
        setval({...val, [e.target.id] : e.target.value});
    }
    
    const submitform = async (e)=>{
      e.preventDefault();

        const url = `${host}/api/auth/loginuser`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: val.email, password: val.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
          localStorage.setItem("token",json.authtoken)
          navigate("/");
        }
        else{
          document.getElementById("alert").classList.remove("d-none");
          setTimeout(()=>{
            console.log("hi")
            document.getElementById("alert").classList.add("d-none");
          },3000)
        }
        
      
  }

  return (
    <>
    <form onSubmit={submitform} className='container mt-5 py-5' style={{border:"2px solid green", borderRadius:"20px", width:"50%", backgroundColor:"#232b2b", color:"white"}}>
      <h3 className='my-5 d-flex justify-content-center align-content-center' style={{color:"white",fontWeight:"bolder"}}>Login form</h3>
      <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-4 col-form-label d-flex justify-content-end">Email</label>
          <div className="col-sm-6" >
          <input type="email" className="form-control" id="email" value={val.email} name='email' onChange={getvalue} placeholder='Enter your Email here' required/>
          </div>
      </div>

      <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label d-flex justify-content-end">Password</label>
          <div className="col-sm-6">
          <input type="password" className="form-control" id="password" name='password' value={val.password} onChange={getvalue} placeholder='Enter your Password here' minLength={8} required/>
          </div>
      </div>
 
      <div id='alert' className="mb-3 row container d-flex justify-content-center d-none">
        <div className='col-sm-9 d-flex justify-content-end align-content-center' style={{marginLeft:"15px"}}>
        <img className='img-fluid mx-2' src="https://img.icons8.com/emoji/48/000000/warning-emoji.png" alt='' style={{width:"24px"}}/>
        <label htmlFor=""> Please enter correct Email and Password</label>
        </div>
      </div>       

      <div className='mb-3 row container d-flex justify-content-center'>
        <label htmlFor="inputPassword" className="col-sm-4 col-form-label d-flex justify-content-end" style={{visibility:"hidden"}}></label>
        <div className='col-sm-8'>
        <button type='submit' className={`btn btn-success my-2`}>Login</button>
        </div>
      </div>       
    </form>
    </>
  )
}
