import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { Notecontext } from '../context/Notestate';

export default function Signup() {
    const {host} = useContext(Notecontext);
    const navigate = useNavigate();
    const[val, setval] = useState({fname:"",age:"", email:"", password:"", cpassword:""});
    const getvalue = (e)=>{
        setval({...val, [e.target.id] : e.target.value});
    }
    
    const submitform = async (e)=>{
      e.preventDefault();

      console.log("signup successfully")
        const url = `${host}/api/auth/createuser`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: val.fname, age: val.age, email: val.email, password: val.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
          localStorage.setItem("token",json.authtoken)
          navigate("/");
        }
        
      
  }

  return (
    <>
    <form onSubmit={submitform} className='container mt-5 p-4' style={{border:"2px solid orange", borderRadius:"20px", width:"50%", backgroundColor:"#232b2b", color:"white"}}>
    <h3 className='my-4 d-flex justify-content-center align-content-center' style={{color:"white",fontWeight:"bolder"}}>SignUp form</h3>
      <div className="mb-3 row">
          <label htmlFor="fname" className="col-sm-4 col-form-label d-flex justify-content-end">Full Name</label>
          <div className="col-sm-6" >
          <input type="text" className="form-control" id="fname" value={val.fname} name='fname' onChange={getvalue} placeholder='Enter your Full name' minLength={3} required/>
          </div>

      </div>
      <div className="mb-3 row">
          <label htmlFor="age" className="col-sm-4 col-form-label d-flex justify-content-end">Age</label>
          <div className="col-sm-6" >
          <input type="text" className="form-control" id="age" value={val.age} name='age' onChange={getvalue} placeholder='Enter your age' required/>
          </div>
      </div>
      <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-4 col-form-label d-flex justify-content-end">Email</label>
          <div className="col-sm-6" >
          <input type="email" className="form-control" id="email" value={val.email} name='email' onChange={getvalue} placeholder='Enter your Email here' required/>
          </div>

      </div>
      <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label d-flex justify-content-end">Password</label>
          <div className="col-sm-6">
          <input type="password" className="form-control" id="password" name='password' value={val.password} onChange={getvalue} placeholder='Create new Password here' minLength={8} required/>
          </div>
      </div>
      <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label d-flex justify-content-end">Confirm Password</label>
          <div className="col-sm-6">
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={val.cpassword} onChange={getvalue} placeholder='Please Confirm your Password here' required/>
          </div>
      </div>
      <div className='mb-3 row container d-flex justify-content-center'>
        <label htmlFor="inputPassword" className="col-sm-4 col-form-label d-flex justify-content-end" style={{visibility:"hidden"}}></label>
        <div className='col-sm-8'>
        <button type='submit' className={`btn btn-warning my-2 ${val.password!==val.cpassword? "disabled": ""}`}>Signup</button>
        </div>
      </div>       
    </form>
    </>
  )
}
