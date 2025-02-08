import React, { useEffect, useRef, useState } from 'react'
import '../assets/css/card.css'
import musics from '../assets/data/index.js';
import { timer } from '../utils/timer.js';


const Card = ({props: { musicNumber, setMusicNumber, setOpen, open }}) => {

  const [duration, setDuration] = useState(1)
  const [currenTime, setCurrenTime] = useState(0)
  const [play, setPlay] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [volume, setVolume] = useState(50)
  const [repeat, setRepeat] = useState('repeat')

  const audioRef = useRef()
  

  const handleLoadStart = (e) => {

    const src = e.nativeEvent.srcElement.src;
    const audio = new Audio(src);
    audio.onloadedmetadata = () => {
      if(audio.readyState > 0) {
        setDuration(audio.duration)
      }
    }
    if(play) { audioRef.current.play() };
  }

  const handlePlayingAudio = () => {

    if(play) {
      audioRef.current.pause();
      setPlay(false)
    }else {
      audioRef.current.play();
      setPlay(true)
    }
  }

  const handleTimeUpdate = (e) => {
    const currenTime = audioRef.current.currentTime;
    setCurrenTime(currenTime)
  }

  const changeCurrentTime = (e) => {
    const currenTime = Number(e.target.value);
    audioRef.current.currentTime = currenTime;
    setCurrenTime(currenTime)
  }

  const handleNextPrev = (n) => {
    setMusicNumber(value => {
      if(n > 0)
        return value + n > musics.length - 1 ? 0 : value + n;

        return value + n < 0 ? musics.length - 1 : value + n;
      
    })
  }

  useEffect(() => {
    audioRef.current.volume = volume / 100; // 0-1
  }, [volume])

  const handleRepeat = () => {
    setRepeat(value => {
      switch (value) {
        case 'repeat':
          return 'repeat_one'
        
        case 'repeat_one':
          return 'shuffle'
      
        default:
          return 'repeat'
      }
    })
  }

  const EndedAudio = () => {
    switch (repeat) {
      case 'repeat_one':
        return audioRef.current.play();
      
      case 'shuffle':
        return handleShuffle();
    
      default:
        return handleNextPrev(1)
    }
  }

  const handleShuffle = () => {
    const num = randomNumber()
    setMusicNumber(num)
  }

  const randomNumber = () => {
    const number = Math.floor(Math.random() * (musics.length - 1))
    if(number == musicNumber)
      return randomNumber();

    return number;
  }
   
  return (
    <div className='card'>
    
      {/* NAV */}

      <div className="nav">
        <i className="material-icons">
            expand_more
        </i>
        <span className='span-glass'>Now Playing {musicNumber + 1}|{musics.length}</span>
        <i className="material-icons" onClick={() => setOpen(!open)}>
            queue_music
        </i>
      </div>
      <div className="img">
        <img src={musics[musicNumber].thumbnail} alt="" className={`${play ? 'playing' : ''}`}/>
        <img className='blur-img' src={musics[musicNumber].thumbnail} alt="" />
      </div>

      <div className="details">
        <p className='title'>{musics[musicNumber].title}</p>
        <p className='artist'>{musics[musicNumber].artist}</p>
      </div>

      {/* PROGRESS */}

      <div className="progress">
        <input type="range" 
          min={0} 
          max={duration} 
          value={currenTime} onChange={e => changeCurrentTime(e)}
          style={{
            background: `linear-gradient(to right,rgb(137, 125, 154) ${currenTime/duration*100}%, #e5e5e5 ${currenTime/duration*100}%)`
          }}
        />
      </div>

      {/* TIMER */}

      <div className="timer">
        <span>{timer(currenTime)}</span>
        <span>{timer(duration)}</span>
      </div>

      {/* CONTROL */}

      <div className="controls">
        <i className="material-icons repeatIcon" onClick={handleRepeat}>
           {repeat}
        </i>

        <i className="material-icons" id='prev'
            onClick={() => handleNextPrev(-1)}  
        >
            skip_previous
        </i>

        <div className="play" onClick={handlePlayingAudio}>
            <i className="material-icons">
                {play ? "pause" : "play_arrow"}
            </i>
        </div>

        <i className="material-icons" id='next' onClick={() => handleNextPrev(1)}  >
            skip_next
        </i>

        {/* volume */}
        <i className="material-icons volumeIcon" onClick={() => setShowVolume(prev => !prev)} >
              volume_up
        </i>

        <div className={`volume ${showVolume ? 'show' : '' }`}>
          <i className="material-icons" onClick={() => setVolume(v => v > 0 ? 0 : 100)}>
              { volume === 0 ? 'volume_off' : 'volume_up'}
          </i>
          <input type="range" min={0} max={100} value={volume} onChange={e => setVolume(Number(e.target.value))} style={{
            background: `linear-gradient(to right, rgb(137, 125, 154) ${volume}%, #e5e5e5 ${volume}%)`
          }} />
          <span>{volume}</span>
        </div>

      </div>

      {/* AUDIO */}

      <audio src={musics[musicNumber].src} hidden ref={audioRef} 
        onLoadStart={handleLoadStart}
        onTimeUpdate={handleTimeUpdate}
        onEnded={EndedAudio}
      />

    </div>
  )
}

export default Card
