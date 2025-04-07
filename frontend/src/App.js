import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { useState } from 'react';

function App() {
  const isLoggedIn = !!localStorage.getItem('authToken');

  const [userEmail, setUserEmail] = useState("");

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Chat userEmail={userEmail} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
