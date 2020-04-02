import React, { useState, useEffect } from 'react';
import axios from 'axios';

const id = Math.ceil(Math.random() * 30000);
const App = (props) => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState([]);
  const [input, setInput] = useState('');


// mayd5ol4 x infinite loop
  // useEffect(() => {
  //   setInterval(

  //     () => axios.get('http://localhost:5000/messages').then((res) => {
  //       setMessages(res.data);
  //     }), 5 * 100)  }, []);

  

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/subscribe');
    eventSource.onmessage = (e) => {
      console.log(e.data);
      const msg = JSON.parse(e.data);
      setMessages(messages => messages.concat(msg));
    }
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
    axios.post('http://localhost:5000/messageSubscribers', { content: name+" said : "+input })
      .then(() => {
        setInput(''); setName('');
      });
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}> 
      your name:-
      <input id="name" value={name} type="text" name="name" onChange={handleChange2}/> 
      your message:-
      <input id="content" value={input} type="text" name="content" onChange={handleChange}/> 
    
        <button type="submit" > Send</button>      
      </form>
       <div>
      {
        messages.map(mess => <h1 key={mess.content}>{mess.content} </h1>)
      }
    </div>
    </div>
  )
}
export default App;