import './App.css'
import Home from './views/Home';
import Navbar from './Components/Navbar';
import ChatView from './views/ChatView';
import ToDoList from './views/ToDoList';
import Weather from './views/Weather';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
