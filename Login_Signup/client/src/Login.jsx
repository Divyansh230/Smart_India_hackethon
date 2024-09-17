import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isHuman, setIsHuman] = useState(null);
  const [emailKeyEvents, setEmailKeyEvents] = useState([]);
  const [passwordKeyEvents, setPasswordKeyEvents] = useState([]);
  const navigate = useNavigate();

  // Geolocation fetch
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
          setLocationError(null);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLocationError("Please enable location services to continue.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Event listeners for keydown and keyup for email field
  useEffect(() => {
    const handleEmailKeyDown = (event) => {
      setEmailKeyEvents((prevData) => [
        ...prevData,
        { type: 'keydown', time: Date.now() },
      ]);
    };

    const handleEmailKeyUp = (event) => {
      setEmailKeyEvents((prevData) => [
        ...prevData,
        { type: 'keyup', time: Date.now() },
      ]);
    };

    const emailField = document.getElementById('email');
    emailField.addEventListener('keydown', handleEmailKeyDown);
    emailField.addEventListener('keyup', handleEmailKeyUp);

    return () => {
      emailField.removeEventListener('keydown', handleEmailKeyDown);
      emailField.removeEventListener('keyup', handleEmailKeyUp);
    };
  }, []);

  // Event listeners for keydown and keyup for password field
  useEffect(() => {
    const handlePasswordKeyDown = (event) => {
      setPasswordKeyEvents((prevData) => [
        ...prevData,
        { type: 'keydown', time: Date.now() },
      ]);
    };

    const handlePasswordKeyUp = (event) => {
      setPasswordKeyEvents((prevData) => [
        ...prevData,
        { type: 'keyup', time: Date.now() },
      ]);
    };

    const passwordField = document.getElementById('password');
    passwordField.addEventListener('keydown', handlePasswordKeyDown);
    passwordField.addEventListener('keyup', handlePasswordKeyUp);

    return () => {
      passwordField.removeEventListener('keydown', handlePasswordKeyDown);
      passwordField.removeEventListener('keyup', handlePasswordKeyUp);
    };
  }, []);

  // Calculate typing speed
  const calculateTypingSpeed = (keyEvents) => {
    if (keyEvents.length < 2) return 0;

    const totalCharacters = keyEvents.filter(event => event.type === 'keyup').length;
    const startTime = keyEvents[0].time;
    const endTime = keyEvents[keyEvents.length - 1].time;
    const timeElapsedMinutes = (endTime - startTime) / (1000 * 60);
    return (totalCharacters / 5) / timeElapsedMinutes;
  };

  // Detect if human or bot based on typing speed
  useEffect(() => {
    const emailWPM = calculateTypingSpeed(emailKeyEvents);
    const passwordWPM = calculateTypingSpeed(passwordKeyEvents);

    if (emailWPM > 100 || passwordWPM > 100) {
      setIsHuman(false); // Likely bot
    } else if (emailKeyEvents.length > 0 && passwordKeyEvents.length > 0) {
      setIsHuman(true); // Likely human
    }
  }, [emailKeyEvents, passwordKeyEvents]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginAttempts >= 5 || isHuman === false) {
      alert("Bots are not allowed.");
      navigate('/');
      return;
    }

    if (locationError) {
      alert(locationError);
      return;
    }

    if (!address) {
      alert('Address is required');
      return;
    }

    axios.post('http://localhost:3001/login', { email, password, address })
      .then(response => {
        console.log(response.data.message);
        if (response.data.message === 'Login Successful') {
          navigate('/home');
        } else {
          alert(response.data);
          setLoginAttempts(prev => prev + 1);
        }
      })
      .catch(err => {
        console.log(err);
        setLoginAttempts(prev => prev + 1);
      });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat py-12 px-6 lg:px-10"
      style={{ 
        backgroundImage: "url('src/WhatsApp Image 2024-09-13 at 23.16.31_b2970948.jpg')" 
      }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-50 p-8 rounded-lg shadow-md space-y-8 ml-20">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {isHuman === null ? (
          <p className="text-center text-sm text-gray-600">Type and move mouse to detect human activity...</p>
        ) : isHuman ? (
          <p className="text-center text-sm text-green-600">Human detected, you can proceed.</p>
        ) : (
          <p className="text-center text-sm text-red-600">Bot detected, you will be redirected.</p>
        )}

        <div className="text-center text-sm text-gray-600">
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
