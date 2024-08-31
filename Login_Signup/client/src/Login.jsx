import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import MouseTracker from "./MouseTracker";
import Home from "./Home";
import KeyboardTracker from "./KeyboardTracker";

const GoogleMapEmbed = ({ liveLocation }) => {
  const [mapSrc, setMapSrc] = useState('');

  useEffect(() => {
    if (liveLocation) {
      const { latitude, longitude } = liveLocation;
      setMapSrc(`https://maps.google.com/maps?width=600&height=500&hl=en&q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`);
    }
  }, [liveLocation]);
  

    return (
    <div className="mapouter" style={{ position: 'relative', textAlign: 'right', width: '600px', height: '500px' }}>
      <div className="gmap_canvas" style={{ overflow: 'hidden', background: 'none !important', width: '600px', height: '500px' }}>
        {mapSrc && (
          <iframe
            className="gmap_iframe"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={mapSrc}
            style={{ width: '600px', height: '500px' }}
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
  const [loginAttempts, setLoginAttempts] = useState(0); // State to track login attempts
  const [lastTypedTime, setLastTypedTime] = useState(null); // Track the time of last typing
  const navigate = useNavigate();

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

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setLastTypedTime(Date.now()); // Update the last typed time on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginAttempts >= 5) {
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

    const timeNow = Date.now();
    console.log(timeNow);
    const timeDifference = (timeNow - lastTypedTime) / 1000; // Time difference in seconds
    console.log(lastTypedTime);
    console.log(timeDifference);

    if (timeDifference > 2) {
      alert("Bot detected: Too much time spent before submission.");
      navigate('/');
      return;
    }
    
    axios.post('http://localhost:3001/login', { email, password, address })
      .then(response => {
        console.log(response.data.message);
        if (response.data.message === 'Login Successful') {
          navigate('/MouseTracker', { state: { email } }); // Redirect to homepage with email state
        } else {
          alert(response.data); // Handle invalid password or other responses
          setLoginAttempts(prev => prev + 1); // Increment login attempts on failure
        }
      })
      .catch(err => {
        console.log(err);
        setLoginAttempts(prev => prev + 1); // Increment login attempts on error
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50 d-flex">
        <div className="w-50">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                value={email}
                onChange={handleInputChange(setEmail)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address"><strong>Address</strong></label>
              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                className="form-control rounded-0"
                value={address}
                onChange={handleInputChange(setAddress)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't Have an Account?{" "}
            <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2">
              Signup
            </Link>
          </p>
        </div>
        <div className="w-50">
          {locationError ? (
            <div className="alert alert-warning">{locationError}</div>
          ) : (
            <GoogleMapEmbed liveLocation={liveLocation} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
