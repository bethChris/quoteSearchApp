import './App.css'
import React from 'react';
import {useState} from 'react';

function App() {
  
  
  const [inputValue, setInputValue] = useState("");
  const [randQ, setRandQ] = useState("");

  const handleInputChange = Event => {
    setInputValue(Event.target.value);
  }

  const handleSubmit = Event => {
    Event.preventDefault();

    console.log("submitted");
    apiGet();
    
  }

  const apiGet = () => {
    let processedInput = inputValue.replace(" ", "%");
    
    console.log(processedInput);

    fetch("https://api.quotable.io/search/quotes?query=" + inputValue + "&fields=author")
    .then((response) => response.json())
    .then((json) => {
      console.log("https://api.quotable.io/search/quotes?query=" + inputValue + "&fields=author");
      setRandQ(json.content);
    });
    
  }

  return (
    <main>
      <h2>Our Input: {inputValue}</h2>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleInputChange} placeholder='Martha Stewart...' type="text"/>
      </form>

      <div>
        {randQ}
      </div>
    </main>

  );
}

export default App;
