import React, { useState, useEffect, useRef, createRef } from "react";
import cyberpunk from '../assets/cyberpunk.jpeg';
import ngnl from '../assets/nogamenolife.png';
import mia from '../assets/Made_in_Abyss.png';
import ahri from '../assets/ahri.jpg'; // Adjust the path as needed
import defaultSound from '../assets/chime.wav'
import troll from '../assets/troll.wav'
import kawa from '../assets/FlowerPics.jpg'
import tog from '../assets/TOG.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faWindowClose,
  faGear,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";


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
  const backgroundInputRef = createRef();
  const soundInputRef = createRef();
  const [tempSound, setTempSound] = useState();
  const [tempUrls, setTempUrls] = useState()
  const [sound, setSound] = useState(defaultSound);
  const [notification, setNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
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

  const handleBackgroundUpload = () => {
    if (backgroundInputRef.current.files.length > 0) {
      const files = Array.from(backgroundInputRef.current.files);
      const fileUrls = files.map((file) => URL.createObjectURL(file));
      setTempUrls(fileUrls);
      setNotification(true)
      setNotificationMessage('Backgrounds uploaded successfully!')
      setTimeout(()=> setNotification(false), 3500)
      
    }
  };

  const handleSoundUpload = () => {
    console.log('handling')
    if (soundInputRef.current.files.length > 0) {
      console.log('shoundt be here')
      const soundUrl = URL.createObjectURL(soundInputRef.current.files[0]);
      setTempSound(soundUrl);
      setNotification(true);
      setNotificationMessage("Sound uploaded successfully!");
      setTimeout(() => setNotification(false), 5000);
    }
  };
  const saveChanges = () =>{
    if(tempUrls){
      setUrls(tempUrls);
      setIndex(0);
    }
    if(tempSound)
      setSound(tempSound)
  }
  return (
    <>
      {settings && (
        <div className="outer-popup">
          <div className="inner-popup">
            <FontAwesomeIcon
              onClick={() => setSettings(false)}
              className="exit"
              icon={faWindowClose}
            />
            <h1>Settings</h1>
            <div className="settings-elements">
              <div className="settings-element">
                Backgrounds
                <div>
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={handleBackgroundUpload}
                    className="hidden-btn"
                    id="actual-background"
                    ref={backgroundInputRef}
                    hidden
                    multiple
                  />

                  <label htmlFor="actual-background" className="actual-btn">
                    <FontAwesomeIcon
                      className="icon-folder"
                      icon={faFolder}
                    ></FontAwesomeIcon>
                  </label>
                </div>
              </div>
              <div className="settings-element">
                Sound
                <div>
                  <input
                    type="file"
                    accept=".wav"
                    onChange={handleSoundUpload}
                    className="hidden-btn"
                    id="actual-sound"
                    ref={soundInputRef}
                    hidden
                  />

                  <label htmlFor="actual-sound" className="actual-btn">
                    <FontAwesomeIcon
                      className="icon-folder"
                      icon={faFolder}
                    ></FontAwesomeIcon>
                  </label>
                </div>
              </div>
            </div>
            <div className="save-container">
              <button className="save" onClick={saveChanges}>
                Save
              </button>
            </div>
          </div>
          {notification && (
            <div className="notification">{notificationMessage}</div>
          )}
        </div>
      )}
      <div
        className="big-container"
        style={{
          backgroundImage: `url(${urls[index]})`,
        }}
      >
        
          <FontAwesomeIcon
            onClick={handleSettings}
            className="settings"
            icon={faGear}
          />
        
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
            <FontAwesomeIcon icon={faArrowsRotate}
          </div>
        </div>
      </div>
    </>
  );
}

export default Countdown;

