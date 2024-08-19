import React, { useState } from 'react';
import './Game.css'
function RandomNumberGenerator() {
  const [randomNumber , setRandomNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    setRandomNumber(randomNum.toString());
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }; v 

  const checkCaptcha = () => {
    if (userInput === randomNumber) {
      setIsCorrect(true);
    } else {
      alert('Incorrect captcha. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Random Number Generator Captcha</h1>
      <button onClick={generateRandomNumber}>Generate Random Number</button>
      <p>Random Number: {randomNumber}</p>
      <input type="text" value={userInput} onChange={handleUserInput} />
      <button onClick={checkCaptcha}>Submit</button>
      {isCorrect && (
        <p>
          Correct! You can now proceed to the next page.
          <a href="/home">Next Page</a>
        </p>
      )}
    </div>
  );
}

export default Game;