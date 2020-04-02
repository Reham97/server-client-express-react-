import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000')

const App = (props) => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log("here1");
    socket.on('new-message', (message) => {
      console.log("here2" + message);
      setMessages(messages => messages.concat(message));
    });
  }, []);


  const handleChange = (e) => {
    const { target: { value } } = e;
    setInput(value);
  }
  const handleChange2 = (e) => {
    const { target: { value } } = e;
    setName(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', input+" said : "+name);
    setInput('');
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        your name:-
      <input id="name" value={name} type="text" name="name" onChange={handleChange2} />
      your message:-
      <input id="content" value={input} type="text" name="content" onChange={handleChange} />

        <button type="submit" > Send</button>
      </form>
      <div>
      {
        messages.map(mess => <h1 key={mess}>{mess} </h1>)
      }
    </div>
    </div>
  )
}




export default App;