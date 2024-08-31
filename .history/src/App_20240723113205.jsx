import { useState } from 'react'
import Test from './components/Test'
import Countdown from './components/Countdown'
import SliderComponent from './components/SliderComponent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <div className=''>
        <Countdown givenTime={1500}/>
    </div>
    </>
  )
}

export default App
