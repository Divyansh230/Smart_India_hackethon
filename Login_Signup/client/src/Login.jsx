import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const GoogleMapEmbed = ({ liveLocation }) => {
  const [mapSrc, setMapSrc] = useState('');

  useEffect(() => {
    if (liveLocation) {
      const { latitude, longitude } = liveLocation;
      setMapSrc(`https://maps.google.com/maps?width=600&height=500&hl=en&q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`);
    }
  }, [liveLocation]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {mapSrc && (
          <iframe
            className="w-full h-96"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={mapSrc}
            title="Google Map"
          ></iframe>
        )}
      </div>
    </div>
  );
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [mouseData, setMouseData] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [isHuman, setIsHuman] = useState(null);
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const navigate = useNavigate();

  // Geolocation fetch
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
          setLocationError(null);
          setGeolocationLoaded(true);
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
      className="min-h-screen flex items-center justify-evenly bg-cover bg-center bg-no-repeat py-12 px-6 lg:px-8"
      style={{ 
        backgroundImage: "url('src/WhatsApp Image 2024-09-13 at 23.16.31_b2970948.jpg')" 
      }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-50 p-8 rounded-lg shadow-md space-y-8">
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

      <div className="w-[600px] h-[600px] pt-20">
        {liveLocation && (
          <div className="mt-8">
            <GoogleMapEmbed liveLocation={liveLocation} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
