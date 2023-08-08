import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import { Input } from '@chakra-ui/react'
const Main = () => {
    const inputRef=useRef(null)
  return (
    <div className='root'>

    
    <div className='container-react-quiz'>
        <h1 className='title-react-quiz text-light'>Quiz React Application</h1>
        <ol className='listt'>
            <li>You will be Asked 15 questions one after another and get points to get React cerfication .</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three Options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>
        <form id="form">
            <Input variant='outline' style={{marginTop:'50px'}} ref={inputRef} type='text' placeholder='Username*'>
            </Input>
        </form>
        <div className='start' style={{marginTop:'50px'}}>
            <Link to='/QuizReact' className='btn'>Start React Quiz</Link>
        </div>
    </div>
    </div>
  )
}

export default Main