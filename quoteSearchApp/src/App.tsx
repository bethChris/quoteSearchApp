import './App.css'
import React, { useEffect } from 'react';
import {useState} from 'react';

function App() {
  
  
  const [inputValue, setInputValue] = useState("");
  const [randQ, setRandQ] = useState("");
  const [searchQs, setSearchQs] = useState([]);

  

  //updates input value
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
    let processedInput = inputValue.replace(" ", "-");

    fetch("https://api.quotable.io/quotes?author=" + processedInput)
    .then((response) => response.json())
    .then((json) => {
      let quotes = json.results
      setSearchQs(quotes);
    });
  }


  //returns main html body

  return (

    <main>
        <h2>Quote Search!</h2>
        <form onSubmit={handleSubmit}>
          <input value={inputValue} onChange={handleInputChange} placeholder='Martha Stewart...' type="text"/>
        </form>

        {searchQs.length <= 0 && 
          <div>
            {randQ}
          </div>
        }

       

        <div>
            {/* gets searchQs keys[] then maps the keys and index to use for displaying content*/}
            {Object.keys(searchQs).map((key, index) => (
                <div className="quote-box" key={index}>{searchQs[key]['content']} - {searchQs[key]['author']}</div>
            ))}
    
        </div>
    </main>


   );
      
  
        



        

        
   

 
}

export default App;
