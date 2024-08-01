import { useState, useEffect } from 'react';
import SockJS from "sockjs-client/dist/sockjs"

interface Message {
  content: string;
  sender: string;
}

const ChatView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new SockJS('/todo/ws');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    socket.addEventListener('message', (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed.');
    });

    setWebSocket(socket);

    // Clean up WebSocket connection on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (webSocket && newMessage.trim() !== '') {
      const sender = 'YourUsername'; // Set your desired username
      const message: Message = { content: newMessage, sender };
      webSocket.send(JSON.stringify(message));
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatView;