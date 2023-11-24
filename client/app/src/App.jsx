import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'
import axios from 'axios';


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
    let lastInputUrl = inputUrl;
    setInputUrl("");
    //  Send update request to backend
    // PATCH({sID: '123', status: 'ongoing', liveShareUrl: inputUrl})
    const response = await axios.patch('http://localhost:3000/startSession', {
      sID: '123', 
      status: 'ongoing', 
      liveShareUrl: lastInputUrl});
    console.log(response);
   
  }


  // STUDENT

  const joinSession = async () => {
    // Only enable when time comes
    // request session data from backend
    
    // GET({sID: '123'})
    const response = await axios.get('http://localhost:3000/getSession', {
      params: 
      {sID: '123'}
    });
    console.log(response);
    
    // If no URL yet then throw Error
    if (!response.data.liveShareUrl) {
      throw new Error('No URL yet');
    }
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
