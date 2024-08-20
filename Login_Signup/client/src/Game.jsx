import React, { useState } from 'react';
import './Game.css';

function Game() {
  const [randomNumber, setRandomNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    setRandomNumber(randomNum.toString());
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const checkCaptcha = () => {
    if (userInput === randomNumber) {
      setIsCorrect(true);
    } else {
      alert('Incorrect captcha. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Random Number Generator Captcha</h1>
      <div className="wrapper">
        <button onClick={generateRandomNumber}>Generate</button>
      </div>
      <p>Random Number: {randomNumber}</p>
      <div className="wrapper">
        <input 
          type="text" 
          value={userInput} 
          onChange={handleUserInput} 
          placeholder="Enter the number"
        />
      </div>
      <div className="wrapper">
        <button onClick={checkCaptcha}>Submit</button>
      </div>
      {isCorrect && (
        <p className="heading">
          Correct! You can now proceed to the next page.
          <a href="/home"> Next Page</a>
        </p>
      )}
    </div>
  );
}

export default Game;
