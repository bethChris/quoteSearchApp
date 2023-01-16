import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { SignUpPage } from './pages/SignUpPage'
import { QuotesSearchPage } from './pages/QuotesSearchPage'

function App() {
  const [count, setCount] = useState(0) 

  return (
    <div className="App">
      <div>
        <QuotesSearchPage/>
      </div>
    </div>
  )
}

export default App
