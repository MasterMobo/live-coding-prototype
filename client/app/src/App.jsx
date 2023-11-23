import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'


const session = {
  sID: '123',
  status: 'inactive'
}

function App() {
  // const navigate = useNavigate();
  
  const [inputUrl, setInputUrl] = useState("");

  const handleChange = (event) => {
    setInputUrl(event.target.value)
  }


  const startSession = async () => {
    // Set URL
    //  Send update request to backend
    // PATCH({sID: '123', status: 'ongoing', liveShareUrl: inputUrl})
  }


  // STUDENT

  const joinSession = () => {
    // Only enable when time comes
    // request session data from backend
    // GET({sID: '123'})
    // If no URL yet then throw Error
  }
  
  return (
    <>
    <h1>Tutor's View</h1>
    <input type="text" placeholder='Live Share URL' onChange={handleChange}/>
    <button>Start Session</button>
    <p>Live Share URL: {inputUrl}</p>
    
    <h1>Student's View</h1>
    <button onClick={joinSession}>Join Session</button>
    </>
  )
}

export default App
