import {React} from 'react'

export default function Editmodal(props) {
    
  return (
        <>
        <div className="card mx-2 my-2" style={{width: "20rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <i className="fa-solid fa-trash-can" onClick={()=>{props.dltnote(props.mynote._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{props.ShowModal(props.mynote)}}></i>
            </div>
        </div>
        </>
  )
}
