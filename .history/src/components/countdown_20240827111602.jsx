import React, { useState, useEffect, useRef } from "react";
import cyberpunk from '../assets/cyberpunk.jpeg';
import ngnl from '../assets/nogamenolife.png';
import mia from '../assets/Made_in_Abyss.png';
import ahri from '../assets/ahri.jpg'; // Adjust the path as needed
import sound from '../assets/chime.wav'
import troll from '../assets/troll.wav'
import kawa from '../assets/FlowerPics.jpg'
import tog from '../assets/TOG.png'


function Countdown({ givenTime }) {
  const [time, setTime] = useState(givenTime);
  const [pause, setPause] = useState(true);
  const [pomo, setPomo] = useState(true);
  const [doublePomo, setDoublePomo] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [breakHover, setBreakHovered] = useState(false);
  const [pomoHover, setPomoHovered] = useState(true);
  const [white, setWhite] = useState(true)
  const [shortBreak, setShortBreak] = useState(true)
  const [longBreak, setLongBreak] = useState(false)
  const [inMidMid, setMidMid] = useState(true)
  const [inTopMid, setTopMid] = useState(false)
  const [inBotMid, setBotMid] = useState(false)
  const [inMidRight, setMidRight] = useState(false)
  const [inTopLeft, setTopLeft] = useState(false)
  const [inBotLeft, setBotLeft] = useState(false)
  const [inMidLeft, setMidLeft] = useState(false)
  const [inTopRight, setTopRight] = useState(false)
  const [inBotRight, setBotRight] = useState(false)
  const startTimeRef = useRef(0)
  const intervalIdRef = useRef(null)
  const [elapsedTime, setElapsedTime] = useState(3)
  const [is0, setIs0] = useState(false)
  const [index, setIndex] = useState(0)
  const [urls, setUrls] = useState(['https://images.alphacoders.com/135/1354376.jpeg',tog])
  const [visablePause, setVisablePause] = useState(true)
  const [visableTime, setVisableTime] = useState(10);

  const [doublePomoStatus, setDoublePomoStatus] = useState(false)
  const [settings, setSettings] = useState(false)

    useEffect(() =>{
      if(!pause)
        {
        intervalIdRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current);
          let temp = Math.round((Date.now() - startTimeRef.current)/1000)
          if(temp >= time){
            setIsVisible(true)
            setTime(0)
            new Audio (sound).play()
            if(index < urls.length - 1){
              console.log(index)
              console.log(urls.length)
              setIndex(index + 1)
            }
            else{      
              setIndex(0)
            }
            clearInterval(intervalIdRef.current)
          }
          setTime(time - temp)
        },10)
        
        }
        return () => clearInterval(intervalIdRef.current)
      }
      ,[pause])
    


 
  useEffect(() => {
    const visiableIntervalId = setInterval(() => {
      setVisableTime((prevTime) => {
        if(!visablePause)
            if (prevTime > 0) {
              setIsVisible(true);
            return prevTime - 1;
            } else {
              setIsVisible(false);
              clearInterval(visiableIntervalId);
            return 0;
            }
        else{
            return visableTime;
        }
      });
    }, 700);

    return () => clearInterval(visiableIntervalId);
  }, [visablePause,visableTime]);


  const showButtons = () =>
  {
      if(pause)
      {
        setIsVisible(true)
      }
      else
      {
        setIsVisible(true)
        setVisablePause(true)
        setVisableTime(1)
      }
  }


  
  const hideButtons = () => {
    if(!pause)
      setVisablePause(false)
  }


  const handlePause = () =>
  {
    if(pause)
    {
      startTimeRef.current = Date.now();
    }
    setPause(!pause)
    if(pause)
    {
      setIsVisible(true)
    }


  }

  function buttonName() {
    return `top-buttons${!isVisible ? 'hide' : ''}`
  }
  function formatTime() {
    if(time <= 0){
      return `00:00`;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  function formatVisableTime() {
    const minutes = Math.floor(visableTime / 60);
    const seconds = visableTime % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  const allFalse =() =>
    {
      setTopLeft(false);
      setTopMid(false);
      setTopRight(false);
      setMidLeft(false);
      setMidMid(false);
      setMidRight(false);
      setBotLeft(false);
      setBotMid(false);
      setBotRight(false);
    }
  function gridContainerName() {
    if(inMidMid) return 'containers-mid-mid';
    else if(inTopLeft) return 'containers-top-left';
    else if (inTopMid)return 'containers-top-mid';
    else if(inTopRight) return 'containers-top-right';
    else if (inMidLeft)return 'containers-mid-left';
    else if(inMidRight) return 'containers-mid-right';
    else if (inBotLeft)return 'containers-bot-left';
    else if (inBotMid)return 'containers-bot-mid';
    else if(inBotRight) return 'containers-bot-right';
    }
  
  const handlePomoClick = () =>{
    if(doublePomoStatus){
      setTime(3000);
      setDoublePomo(true);
    }
    else{
      setTime(1500);
      setPomo(true);
      setDoublePomo(false);
    }
    setPause(true);
  }
  const handlePomoDoubleClick = () =>{
    if(pomo){
      setTime(3000);
      setDoublePomo(true);
      setDoublePomoStatus(true);
      setPomo(false);
    }
    else{
      setTime(1500);
      setDoublePomo(false);
      setDoublePomoStatus(false);
      setPomo(true);
    }
    setPause(true);
  }

  const handleBreakClick = () =>{
    if(longBreak){
      setTime(600);
    }
    else{
      setTime(2);
      setShortBreak(true);
      setLongBreak(false);
    }
    setPause(true);
    setPomo(false);
    setDoublePomo(false);
  }
  const handleBreakDoubleClick = () =>{
    if(shortBreak){
      setTime(600);
      setLongBreak(true);
      setShortBreak(false);
    }
    else{
      setTime(300);
      setLongBreak(false);
      setShortBreak(true);
    }
    setPause(true);
    setPomo(false);
    setDoublePomo(false);
  }
  const handleSettings = () =>{
    setSettings(true)
  }

  return (
    <>
      {settings && (
        <div className="outer-popup">
          <div className="inner-popup">
            <div>
              <button onClick={()=> setSettings(false)} style={{justifyContent}}>Close</button>
              <h1>Settings</h1>
            </div>
          </div>
        </div>
      )}
      <div
        className="big-container"
        style={{
          backgroundImage: `url(${urls[index]})`,
        }}
      >
        <button onClick={handleSettings} className="settings">
          settings
        </button>
        <button
          onClick={() => {
            allFalse();
            setTopLeft(true);
            showButtons();
            hideButtons();
          }}
          className={`top-left${!white ? "black" : ""}`}
        >
          <button className="settings">settings</button>
        </button>
        <button
          onClick={() => {
            allFalse();
            setTopMid(true);
            showButtons();
            hideButtons();
          }}
          className={`top-mid${!white ? "black" : ""}`}
        >
          <button className="settings">settings</button>
        </button>
        <button
          onClick={() => {
            allFalse();
            setTopRight(true);
            showButtons();
            hideButtons();
          }}
          className={`top-right${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setMidLeft(true);
            showButtons();
            hideButtons();
          }}
          className={`mid-left${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setMidMid(true);
            showButtons();
            hideButtons();
          }}
          className={`mid-mid${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setMidRight(true);
            showButtons();
            hideButtons();
          }}
          className={`mid-right${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setBotLeft(true);
            showButtons();
            hideButtons();
          }}
          className={`bot-left${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setBotMid(true);
            showButtons();
            hideButtons();
          }}
          className={`bot-mid${!white ? "black" : ""}`}
        ></button>
        <button
          onClick={() => {
            allFalse();
            setBotRight(true);
            showButtons();
            hideButtons();
          }}
          className={`bot-right${!white ? "black" : ""}`}
        ></button>

        <div
          id="everything"
          onMouseEnter={showButtons}
          onMouseLeave={hideButtons}
          className={gridContainerName()}
        >
          <div
            onMouseEnter={showButtons}
            onMouseLeave={hideButtons}
            className={buttonName()}
          >
            <button
              onMouseEnter={() => setPomoHovered(true)}
              onMouseLeave={() => setPomoHovered(false)}
              className={`buttons${
                (pomo || doublePomo) && !breakHover ? "active" : ""
              }${!white ? "black" : ""}`}
              onDoubleClick={handlePomoDoubleClick}
              onClick={handlePomoClick}
            >
              pomodoro
            </button>
            <button
              onDoubleClick={handleBreakDoubleClick}
              className={`buttons${
                !pomo && !doublePomo && !pomoHover ? "active" : ""
              }${!white ? "black" : ""}`}
              onClick={handleBreakClick}
            >
              {" "}
              {longBreak ? "long break" : "short break"}
            </button>
          </div>

          <div onDoubleClick={() => setWhite(!white)} className="inner-element">
            <h2 className={`time${!white ? "black" : ""}`}>{formatTime()}</h2>
          </div>
          <div
            onMouseEnter={showButtons}
            onMouseLeave={hideButtons}
            className={buttonName()}
          >
            <button
              onClick={handlePause}
              className={`pause-button${!white ? "black" : ""}`}
            >
              {pause ? "start" : "pause"}
            </button>
            <button
              onDoubleClick={() =>
                index >= urls.length - 1 ? setIndex(0) : setIndex(index + 1)
              }
              className={`buttons${!white ? "black" : ""}`}
              onClick={() => {
                pomo ? setTime(1500) : setTime(300);
                setPause(true);
              }}
            >
              refresh
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Countdown;

