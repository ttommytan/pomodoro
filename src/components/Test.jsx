import React, {useState, useEffect, useRef} from "react";

function Test(){
    const [hover, setHover] = useState(true)
    const timeOutRef = useRef(null)


    const [time, setTime] = useState(10);
    const [pause, setPause] = useState(true);
    function formatTime() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      }
    
  
  
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if(!pause)
              if (prevTime > 0) {
                setHover(true);
              return prevTime - 1;
              } else {
                setHover(false);
              clearInterval(intervalId);
              return 0;
              }
          else{
              return time;
          }
        });
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [pause,time]);


    const hideText =() =>
    {   console.log('leaving')
        setPause(false)

    }

    const showText = () =>
    {
        setHover(true)
        setPause(true)
        setTime(7)
    }

    useEffect( ()=> {

    },[])

    function buttonName() {
        console.log("changing button class name")
        console.log({hover})
        return `top-buttons${!hover ? 'hide' : ''}`
      }
    return(
    <>
        <h2>{formatTime()}</h2>
        <h1 className={buttonName()}>The Text</h1>
        <button onMouseEnter={showText} onMouseLeave={hideText}>hover over me</button>
        <button onClick={()=> setPause(false)} >start timer</button>
    </>
);
}

export default Test