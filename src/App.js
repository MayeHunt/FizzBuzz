import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [singleNumber, setSingleNumber] = useState('');
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(25);
  const [getResult, setGetResult] = useState('');
  const [postResult, setPostResult] = useState('');

  // GET
  const handleGet = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://<your-function-app-name>.azurewebsites.net/api/GetFizzBuzz?number=${singleNumber}`);
      const data = await response.text();
      setGetResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setGetResult('Error fetching data');
    }
  };

  // POST
  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://<your-function-app-name>.azurewebsites.net/api/GetFizzBuzz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start: rangeStart, end: rangeEnd }),
      });

      const data = await response.text();
      setPostResult(data);
    } catch (error) {
      console.error('Error posting data:', error);
      setPostResult('Error posting data');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>FizzBuzz App</h1>
        <form onSubmit={handleGet}>
          <label>
            Enter a number for FizzBuzz:
            <input
              type="number"
              value={singleNumber}
              onChange={(e) => setSingleNumber(e.target.value)}
              required
            />
          </label>
          <button type="submit">Get FizzBuzz</button>
        </form>
        {getResult && <p>Result: {getResult}</p>}
        <form onSubmit={handlePost}>
          <label>
            Enter a range (default 1 to 25):
            <input
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              min="1"
            />
            <input
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              min="1"
            />
          </label>
          <button type="submit">Post Range</button>
        </form>
        {postResult && <p>Result: {postResult}</p>}
      </header>
    </div>
  );
}

export default App;
