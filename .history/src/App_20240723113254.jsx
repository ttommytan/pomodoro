import { useState } from 'react'
import Test from './components/Test'
import Countdown from './components/Countdown'
import SliderComponent from './components/SliderComponent'

function App() {
  const [count, setCount] = useState(0)
  const slides = [
    { content: <div>Slide 1 Content</div> },
    { content: <div>Slide 2 Content</div> },
    { content: <div>Slide 3 Content</div> },
    { content: <div>Slide 4 Content</div> },
    { content: <div>Slide 5 Content</div> },
  ];
  
  return (
    <>
    
    <div className=''>
        <Countdown givenTime={1500}/>
    </div>
    </>
  )
}

export default App
