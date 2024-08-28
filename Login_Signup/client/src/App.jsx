import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OTPVerification from './OTPVerification';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/game" element={<Game/>}/>
          <Route path="/verify" element={<OTPVerification/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
