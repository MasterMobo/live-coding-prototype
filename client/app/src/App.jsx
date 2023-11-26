import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'
import axios from 'axios';
import logo from './images/address.png'

const mySessionID = "123" // This is a fake ID, will have to implement scheduling feature


function App() {
  // const navigate = useNavigate();
  
  const [inputUrl, setInputUrl] = useState("");
  const [renderComponent, setRenderComponent] = useState(null);

  

  const handleChange = (event) => {
    setInputUrl(event.target.value)
  }


  const startSession = async () => {
    // Set URL
    let lastInputUrl = inputUrl;


    setInputUrl("");
    //  Send update request to backend
    // PATCH({sID: '123', status: 'ongoing', liveShareUrl: inputUrl})
    const response = await axios.patch(`http://localhost:3000/api/v1/session/${mySessionID}`, {
      status: 'ongoing', 
      liveShareUrl: lastInputUrl});
      
    console.log(response);
   
  }

  // TUTOR
  const tutorInterface = async () => {
    setRenderComponent(
      <>
      <div className='headTitle'>
        <h1>Meeting 68757</h1>
        <div className='student'>
          <img className='logo' src={logo} alt='student'></img>
          <p>Student</p>
        </div>
        <div className='tutor'>
          <img className='logo' src={logo} alt='tutor' onClick={tutorInterface}></img>
          <p>Tutor</p>
        </div>
      </div>
     
  
      <div className='infoLine date'>
        <h3 className='title'>Date: </h3>
        <h3 className='text'>Mon 09/11/2924</h3>
      </div>
  
      <div className='infoLine startTime'>
        <h3 className='title'>Start Time: </h3>
        <h3 className='text'>12am PCT</h3>
      </div>
  
      <div className='infoLine endTime'>
        <h3 className='title'>End Time: </h3>
        <h3 className='text'>2am PCT</h3>
      </div>
  
      <h4 id='message'>To start the meeting, enter Live Share URL</h4>
      <div className='startSession'>
        <input type="text" placeholder='Live Share URL' onChange={handleChange}/>
        <button onClick={startSession}>Start Session</button>
      </div>
      {/* <h1>Tutor's View</h1>
      <input type="text" placeholder='Live Share URL' onChange={handleChange}/>
      <button onClick={startSession}>Start Session</button>
      <p>Live Share URL: {inputUrl}</p>
      
      <h1>Student's View</h1>
      <button onClick={joinSession}>Join Session</button> */}
      </>
      )
    }

  

  // STUDENT
  const studentInterface = async () => {
    // Only enable when time comes
    // request session data from backend
    
    // GET({sID: '123'})
    const response = await axios.get(`http://localhost:3000/api/v1/session/${mySessionID}`);
    console.log(response.data);
    
    // If no URL yet then throw Error
    if (!response.data.liveShareUrl) {
      throw new Error('No URL yet');
    }

    if (response.data.status === 'ongoing') {
      // Redirect to live share URL
      setRenderComponent(<>
        <div className='headTitle'>
          <h1>Meeting 68757</h1>
          <div className='student'>
            <img className='logo' src={logo} alt='student'></img>
            <p>Student</p>
          </div>
          <div className='tutor'>
            <img className='logo' src={logo} alt='tutor' onClick={tutorInterface}></img>
            <p>Tutor</p>
          </div>
        </div>
        <div className='infoLine date'>
          <h3 className='title'>Date: </h3>
          <h3 className='text'>Mon 09/11/2924</h3>
        </div>
    
        <div className='infoLine startTime'>
          <h3 className='title'>Start Time: </h3>
          <h3 className='text'>12am PCT</h3>
        </div>
    
        <div className='infoLine endTime'>
          <h3 className='title'>End Time: </h3>
          <h3 className='text'>2am PCT</h3>
        </div>
    
        <h4 id='message'>Session is ongoing</h4>
        <div className='joinSession'>
          <button onClick={startSession}>Join Session</button>
        </div>
        </>);
    } else {
      renderComponent = (<>
        <div className='headTitle'>
          <h1>Meeting 68757</h1>
          <div className='student'>
            <img className='logo' src={logo} alt='student'></img>
            <p>Student</p>
          </div>
          <div className='tutor'>
            <img className='logo' src={logo} alt='tutor' onClick={tutorInterface}></img>
            <p>Tutor</p>
          </div>
        </div>
        <div className='infoLine date'>
          <h3 className='title'>Date: </h3>
          <h3 className='text'>Mon 09/11/2924</h3>
        </div>
    
        <div className='infoLine startTime'>
          <h3 className='title'>Start Time: </h3>
          <h3 className='text'>12am PCT</h3>
        </div>
    
        <div className='joinSession'>
          <button onClick={startSession}>Join Session</button>
        </div>
        </>)
    
    }
  }
    
    return (
      <div className='headTitle'>
        <h1>Meeting 68757</h1>
        <div className='student'>
          <img className='logo' src={logo} alt='student' onClick={studentInterface}></img>
          <p>Student</p>
        </div>
        <div className='tutor'>
          <img className='logo' src={logo} alt='tutor' onClick={tutorInterface}></img>
          <p>Tutor</p>
        </div>
      </div>
    )

  }


export default App
