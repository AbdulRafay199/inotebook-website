import {React,useContext,useState} from 'react'
import { Notecontext } from '../context/Notestate';

export default function Addnote() {
    const {host,getallnotes} = useContext(Notecontext);
    const[val, setval] = useState({_id:"",title:"", description:"", tag:""});
    const getvalue = (e)=>{
        setval({...val, [e.target.id] : e.target.value});
    }

    const addnote = async ()=>{
        const url = `${host}/api/note/addnotes`
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(val)
            
        });
        getallnotes();
        const json = await response.json()
        console.log(json)
        // setnote(note.concat(val));

    }


  return (
    <div className='container'>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Enter your Note Title" onChange={getvalue} value={val.title}/>
        </div>

        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="3" placeholder='Enter your Note Description'  onChange={getvalue} value={val.description}></textarea>
        </div>
        <div>
            <button type="submit" className="btn btn-success mb-3" onClick={addnote}>Add Note</button>
        </div>
    </div>
  )
}
