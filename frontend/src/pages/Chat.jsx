import React from 'react';
import { useEffect, useState } from 'react';
import { GET_USERNAMES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { UsernamesList } from './Userlist';

export default function Chat(props) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  //const [getUsernames, {data, loading, error}] = useQuery(GET_USERNAMES);

  useEffect(() => {
    const connectionUrl = "ws://localhost:8080/ws?token=" + localStorage.getItem("authToken");
    const ws = new WebSocket(connectionUrl); // Adjust to your server
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    };
    setSocket(ws);


    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && text.trim()) {
      const msg = {
        from: props.userEmail,
        to: 'gulay17@gmail.com', // Replace with dynamic value later
        content: text,
      };
      socket.send(JSON.stringify(msg));
      setText('');
    }
  };

  /*
  const getUsers = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getUsernames();
    } catch (err)
    {
      console.error(err);
    }

    console.log(data);
  }
    */
    

  return (
    <div>
      <h2>Chat</h2>

      <div>
        <UsernamesList></UsernamesList>
      </div>






      <div style={{ border: '1px solid #ccc', height: '200px', overflowY: 'scroll' }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.from}:</strong> {m.content}
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
