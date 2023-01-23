import './App.css'
import React, { useEffect } from 'react';
import {useState} from 'react';

let ID_COUNT = 0;

interface Quote{
  id: number,
  content: string,
  author: string
}


function App() {


  const [inputValue, setInputValue] = useState("");
  const [randQ, setRandQ] = useState<Quote>();
  const [searchQs, setSearchQs] = useState<Quote[]>([]);


  //call and get random quote
  useEffect(() => {
    fetch("https://usu-quotes-mimic.vercel.app/api/random")
    .then((response) => response.json())
    .then((json) => {
      var quote = {
        id: ID_COUNT++,
        content: json.content,
        author: json.author
      }


      setRandQ(quote);
    
    }); 
  }, [])


  //updates input value
  const handleInputChange = Event => {
    setInputValue(Event.target.value);
  }


  //processes the submit 
  const handleSubmit = (Event) => {
    Event.preventDefault();

    if (inputValue){ //if there's actually input
      apiGetSearch();
    }else{
      setSearchQs([]);
    }

    console.log("submitted"); 
  }


  //fetch's the quote based on the search input
  const apiGetSearch = () => {
    fetch("https://usu-quotes-mimic.vercel.app/api/search?query="+ inputValue)
    .then((response) => response.json())
    .then((json) => {

      console.log("made it here");
      var quoteList: Array<Quote> = []; //new empty Quote array

      for (var i = 0; i < json.count; i++){
        var quote = {
          id: ID_COUNT++,
          content: json.results[i].content,
          author: json.results[i].author
        }  

        quoteList[i] = quote;
      }

      
      setSearchQs(quoteList);
      
    });
  }



  //returns main html body
  return (
    <main>
        <h2>Quote Search!</h2>
        <form onSubmit={handleSubmit}>
          <input value={inputValue} onChange={handleInputChange} placeholder='Martha Washington...' type="text"/>
        </form>

        {searchQs.length <= 0 && 
          <div key={randQ?.id}>
            {randQ?.content} 
            <p> - {randQ?.author}</p>
          </div>
        }

        <div>
            {/* gets searchQs keys[] then maps the keys and index to use for displaying content*/}
            {searchQs.map((quote) => (
                <div className="quote-box" key={quote.id}>{quote.content} - {quote.author}</div>
            ))}
        </div>
    </main>
   );
}

//Notes for future me:

export default App;
