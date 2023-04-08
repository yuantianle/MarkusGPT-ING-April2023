// Create a react component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and displays the message in a div below the textarea. 

import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    })
    const data = await response.json();

    setResponse(data.message);
  }

  return (
    <div className="App">
      <h1>Marcus GPT Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <label>Message</label>
        <textarea 
          value={message} 
          placeholder='Enter your message to start a conversation 😎'
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {response && <div><b>Marcus: </b>{response}</div>}
    </div>
  );
}

export default App;