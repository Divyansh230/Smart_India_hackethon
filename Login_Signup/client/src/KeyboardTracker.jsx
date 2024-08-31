import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

const KeyboardTracker = () => {
  const [inputData, setInputData] = useState([]);
  const [isHuman, setIsHuman] = useState(null);
  const [typedText, setTypedText] = useState('');

  // Event listener for keydown and keyup
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

  // Detect human or bot
  useEffect(() => {
    if (inputData.length > 20) { // Wait until enough data is captured
      const result = detectHumanOrBot(inputData);
      setIsHuman(result);
    }
  }, [inputData]);

  const detectHumanOrBot = (data) => {
    const { wpm, pressDurations, intervalTimes } = calculateFeatures(data);

    // Calculate variance for press durations and intervals
    const pressVariance = calculateVariance(pressDurations);
    const intervalVariance = calculateVariance(intervalTimes);

    // Heuristic-based detection logic
    if (wpm < 80 && pressVariance > 0.05 && intervalVariance > 0.05) {
      return true; // Likely human
    } else {
      return false; // Likely bot
    }
  };

  const calculateFeatures = (data) => {
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

    // Calculate typing speed (WPM)
    const timeElapsedMinutes = (endTime - startTime) / (1000 * 60);
    const wpm = (totalCharacters / 5) / timeElapsedMinutes;

    return { wpm, pressDurations, intervalTimes };
  };

  const calculateVariance = (values) => {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
  };

  return (
    <div>
      <h2>Keyboard Typing Detection</h2>
      <input
        type="text"
        onChange={(e) => setTypedText(e.target.value)}
        placeholder="Type something..."
      />
      <p>{isHuman === null ? 'Type to detect...' : isHuman ? 
      <p>Human Detected <Link to="/home">Home</Link></p> : 
      <p>
      'Bot Detected'
      <Link to="/">Back</Link>
      </p>}</p>
    </div>
  );
};

export default KeyboardTracker;