import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import List from './components/List'
import musics from './assets/data';

function App() {

  const [musicNumber, setMusicNumber] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <div className='container'>

      <main>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <img className='blur-img' src={musics[musicNumber].thumbnail} alt="" />
        <Card  props={{musicNumber, setMusicNumber, open, setOpen}} />
        <List props={{open, setOpen, musicNumber, setMusicNumber}} />
      </main>
      
    </div>
  )
}

export default App
