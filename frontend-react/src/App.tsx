import './App.css'
import Navbar from './Components/Navbar';
import ChatView from './views/ChatView';
import ToDoList from './views/ToDoList';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/Home" element={<ToDoList />} />
          <Route path="/Chat" element={<ChatView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
