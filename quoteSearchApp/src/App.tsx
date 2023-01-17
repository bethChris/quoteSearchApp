import './App.css'
import React from 'react';
import {useState} from 'react';

function App() {
  
  
  const [inputValue, setInputValue] = useState("");
  const [randQ, setRandQ] = useState("");
  const [searchQs, setSearchQs] = useState("");

  const handleInputChange = Event => {
    setInputValue(Event.target.value);
  }

  const handleSubmit = Event => {
    Event.preventDefault();

    console.log("submitted");
    apiGetSearch();
    apiGetRandom();
  }

  const apiGetRandom = () => {
    
    fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((json) => {
      setRandQ(json.content);
    });
    
  }

  const apiGetSearch = () => {
    let processedInput = inputValue.replace(" ", "+");

    fetch("https://api.quotable.io/search/quotes?query=" + processedInput + "&fields=author")
    .then((response) => response.json())
    .then((json) => {
      let quotes = json['results']
      setSearchQs(quotes);
    });

    console.log("https://api.quotable.io/search/quotes?query=" + processedInput + "&fields=author");
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

      <div>
      <ul>
        {Object.keys(searchQs).map((key, index) => (
            <div className="quote-box" key={index}>{JSON.stringify(searchQs[key]['content'])} - {JSON.stringify(searchQs[key]['author'])}</div>
        ))}
      </ul>
      </div>
      
    </main>

  );
}

export default App;
