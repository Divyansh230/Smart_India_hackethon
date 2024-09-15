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
  const [geolocationLoaded, setGeolocationLoaded] = useState(false); // For geolocation status
  const navigate = useNavigate();

  // Geolocation fetch
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
          setLocationError(null);
          setGeolocationLoaded(true); // Mark geolocation as loaded
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

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, timeStamp } = e;
      setMouseData((prevData) => [
        ...prevData,
        { x: clientX, y: clientY, time: timeStamp },
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Keyboard input tracking
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentTime = Date.now();
      setInputData((prevData) => [
        ...prevData,
        {
          key: event.key,
          type: 'keydown',
          time: currentTime,
        },
      ]);
    };

    const handleKeyUp = (event) => {
      const currentTime = Date.now();
      setInputData((prevData) => [
        ...prevData,
        {
          key: event.key,
          type: 'keyup',
          time: currentTime,
        },
      ]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Analyze mouse and keyboard data
  useEffect(() => {
    if (mouseData.length > 50 && inputData.length > 20 && geolocationLoaded) {
      setIsHuman(detectHumanOrBot(mouseData, inputData));
    }
  }, [mouseData, inputData, geolocationLoaded]);

  const detectHumanOrBot = (mouseData, inputData) => {
    const mouseResult = analyzeMouseData(mouseData);
    const keyboardResult = analyzeKeyboardData(inputData);
    return mouseResult && keyboardResult;
  };

  const analyzeMouseData = (data) => {
    const { speeds, accelerations } = calculateMouseFeatures(data);

    const speedVariance = speeds.reduce((a, b) => a + Math.abs(b - speeds[0]), 0);
    const accelerationVariance = accelerations.reduce(
      (a, b) => a + Math.abs(b - accelerations[0]),
      0
    );

    return (speedVariance > 0.1 && accelerationVariance > 0.01);
  };

  const analyzeKeyboardData = (data) => {
    const { wpm, pressDurations, intervalTimes } = calculateKeyboardFeatures(data);

    const pressVariance = calculateVariance(pressDurations);
    const intervalVariance = calculateVariance(intervalTimes);

    return (wpm < 80 && pressVariance > 0.05 && intervalVariance > 0.05);
  };

  const calculateMouseFeatures = (data) => {
    if (data.length < 2) return { speeds: [], accelerations: [] };

    const speeds = [];
    const accelerations = [];

    for (let i = 1; i < data.length; i++) {
      const dx = data[i].x - data[i - 1].x;
      const dy = data[i].y - data[i - 1].y;
      const dt = data[i].time - data[i - 1].time;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      speeds.push(speed);

      if (i > 1) {
        const acceleration =
          (speed - speeds[i - 2]) / (data[i].time - data[i - 2].time);
        accelerations.push(acceleration);
      }
    }

    return { speeds, accelerations };
  };

  const calculateKeyboardFeatures = (data) => {
    const keyDownTimes = {};
    const pressDurations = [];
    const intervalTimes = [];
    let lastKeyTime = null;
    let totalCharacters = 0;
    let startTime = data[0].time;
    let endTime = data[data.length - 1].time;

    data.forEach((event) => {
      if (event.type === 'keydown') {
        keyDownTimes[event.key] = event.time;
      } else if (event.type === 'keyup' && keyDownTimes[event.key]) {
        const pressDuration = event.time - keyDownTimes[event.key];
        pressDurations.push(pressDuration);
        delete keyDownTimes[event.key];

        if (lastKeyTime) {
          const intervalTime = event.time - lastKeyTime;
          intervalTimes.push(intervalTime);
        }
        lastKeyTime = event.time;
        totalCharacters++;
      }
    });

    const timeElapsedMinutes = (endTime - startTime) / (1000 * 60);
    const wpm = (totalCharacters / 5) / timeElapsedMinutes;

    return { wpm, pressDurations, intervalTimes };
  };

  const calculateVariance = (values) => {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
  };

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
    <div className="min-h-screen flex items-center justify-evenly bg-gray-100 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
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
      <div class="w-[600px] h-[600px] pt-20">
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
