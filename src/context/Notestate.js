import {createContext, React,  useState } from "react";
const Notecontext = createContext();

const Notestate = (props)=> {
    const host = "http://localhost:5000"
    const notes = []
    const [note,setnote] = useState(notes);  
    const getallnotes = async ()=>{
        const url = `${host}/api/note/fetchnotes`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token"),
            }
          });
          const json = await response.json()
          setnote(json)
    }
    
  return (

    <Notecontext.Provider value={{note, setnote,host,getallnotes}}>
        {props.children}
    </Notecontext.Provider>
  )
}

export default Notestate;
export {Notecontext};