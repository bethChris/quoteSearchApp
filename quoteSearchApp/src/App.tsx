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

  //processes the submit 
  const handleSubmit = Event => {
    Event.preventDefault();

    if (inputValue){ //if there's actually input
      apiGetSearch();
      apiGetRandom();
    }

    console.log("submitted"); 
  }


  //fetch's the random quote 
  const apiGetRandom = () => {
    
    fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((json) => {
      setRandQ(json.content);
    });
    
  }


  //fetch's the quote based on the search input
  const apiGetSearch = () => {
    let processedInput = inputValue.replace(" ", "+");

    fetch("https://api.quotable.io/search/quotes?query=" + processedInput + "&fields=author")
    .then((response) => response.json())
    .then((json) => {
      let quotes = json['results']
      setSearchQs(quotes);
    });
  }


  //returns main html body
  return (
    <main>
      <body>
        <h2>Quote Search!</h2>
        <form onSubmit={handleSubmit}>
          <input value={inputValue} onChange={handleInputChange} placeholder='Martha Stewart...' type="text"/>
        </form>

        <div>
          {randQ}
        </div>

        <div>
        
          {Object.keys(searchQs).map((key, index) => (
              <div className="quote-box" key={index}>{JSON.stringify(searchQs[key]['content'])} - {JSON.stringify(searchQs[key]['author'])}</div>
          ))}

        </div>

      </body>
    </main>

  );
}

export default App;
