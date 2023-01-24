import './App.css'
import React, { useEffect, useState, FormEvent } from 'react';
let ID_COUNT = 0;

interface Quote{
  _id: number,
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
        _id: json._id,
        content: json.content,
        author: json.author
      }


      setRandQ(quote);
    
    }); 
  }, [])


  //processes the submit 
  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

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
      var quoteList: Array<Quote> = []; //new empty Quote array

      for (var i = 0; i < json.count; i++){
        var quote = {
          _id: json.results[i]._id,
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
          <div>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Martha Washington...' type="text"/>
          </div>
        </form>

        {searchQs.length <= 0 && 
          <div>
            <div className="randQ-box" key={randQ?._id}>
              {randQ?.content} 
              <p className='author'> - {randQ?.author}</p>
            </div>
          </div>
        }

        <div>
            {/* gets searchQs keys[] then maps the keys and index to use for displaying content*/}
            {searchQs.map((quote) => (
                <div className="quote-box" key={quote._id}>{quote.content} 
                <p className="author"> - {quote.author} </p>
                </div>
            ))}
        </div>
    </main>
   );
}

export default App;
