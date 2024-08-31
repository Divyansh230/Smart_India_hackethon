// src/MouseTracker.js

import React, { useState, useEffect } from 'react';
import Home from './Home';
import KeyboardTracker from './KeyboardTracker';
import { Link } from 'react-router-dom';

const MouseTracker = () => {
  const [mouseData, setMouseData] = useState([]);
  const [isHuman, setIsHuman] = useState(null);

  // Capture mouse movements
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

  // Function to calculate speed and acceleration
  const calculateFeatures = (data) => {
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

  // Simple heuristic-based AI function
  const detectHumanOrBot = (data) => {
    const { speeds, accelerations } = calculateFeatures(data);

    // Heuristic: Check variance in speeds and accelerations
    const speedVariance = speeds.reduce((a, b) => a + Math.abs(b - speeds[0]), 0);
    const accelerationVariance = accelerations.reduce(
      (a, b) => a + Math.abs(b - accelerations[0]),
      0
    );

    // Thresholds for detecting human vs bot behavior
    if (speedVariance > 0.1 && accelerationVariance > 0.01) {
      return true; // Likely human
    } else {
      return false; // Likely bot
    }
  };

  useEffect(() => {
    if (mouseData.length > 50) {  // Analyze after 50 movements
      setIsHuman(detectHumanOrBot(mouseData));
    }
  }, [mouseData]);

  return (
    <div style={{ height: '100vh', textAlign: 'center', paddingTop: '20vh' }}>
      <h1>Mouse Movement Detection</h1>
      <p>
        Move your mouse around to see if you are detected as a human or a bot.
      </p>
      {isHuman === null ? (
        <p>Collecting data...</p>
      ) : isHuman ? (
        
        <p style={{ color: 'green' }}>You are a Human!

        <Link to="/KeyboardTracker">KeyboardTracker</Link>
        </p>
        
      ) : (
        <p style={{ color: 'red' }}>You are a Bot!
        <Link to="/">Back</Link>
        </p>
      )}
    </div>
  );
};

export default MouseTracker;