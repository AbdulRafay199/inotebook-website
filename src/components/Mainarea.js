import {React,useContext,useState,useRef} from 'react'
import '../Mainarea.css'
import { Notecontext } from '../context/Notestate';
import Editmodal from './Noteitem';
import Addnote from './Addnote';
import { useEffect} from 'react';
import {useNavigate} from "react-router-dom";


export default function Mainarea() {
    const {note,setnote,getallnotes,host} = useContext(Notecontext);
    const closeref = useRef(null);
    const[updateval, setupdateval] = useState({_id:"",title:"", description:"", tag:""});
    const navigate = useNavigate();

    useEffect( () => {
        const myauthtoken = localStorage.getItem("token");
        if(myauthtoken){
            getallnotes();
        }
        else{
            navigate("/login");
        }
        //eslint-disable-next-line
    },[])

    const dltnote = async (id)=>{

        const url = `${host}/api/note/deletenotes/${id}`
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },               
        }); 
        console.log(await response.json())
        getallnotes();
        
        const filterednote = await note.filter(note => note._id !== id)
        setnote(filterednote);
    }

    const getvalue = (e)=>{
        setupdateval({...updateval, [e.target.id] : e.target.value});
    }

    const ShowModal = (currentnote)=>{
        setupdateval(currentnote);
        console.log(currentnote)
    }

    const updatenotes = async ()=>{
        const url = `${host}/api/note/updatenotes/${updateval._id}`
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(updateval)
            
        });
        const json = await response.json()
        console.log(json)
        getallnotes();


        let tempnote = note.slice();
        for(var i=0; i<tempnote.length; i++){
            if(tempnote[i].id === updateval._id){
                tempnote[i].title = updateval.title;
                tempnote[i].description = updateval.description;
                tempnote[i].tag = updateval.tag;
                break
            }
        }
        setnote(tempnote);
        closeref.current.click();
    }


  return (
    <>
    <div className='container my-3'>
        <Addnote/>

        {/* button to open edit modal */}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeref}></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter your Note Title" onChange={getvalue} value={updateval.title}/>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3" placeholder='Enter your Note Description'  onChange={getvalue} value={updateval.description}></textarea>
            </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-warning" onClick={updatenotes}>Save changes</button>
            </div>
            </div>
        </div>
        </div>

        <div className='container row d-flex flex-row my-3 justify-content-start'>
            {note.map((note)=>{

                    return <Editmodal id={note._id} title={note.title} description={note.description} dltnote={dltnote} key={note._id} ShowModal={ShowModal} mynote={note}/>
                                
                })
            }
        </div>
    </div>
    </>
  )
}
