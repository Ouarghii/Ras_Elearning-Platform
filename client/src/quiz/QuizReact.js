import React from 'react'
import QuestionsReact from './components/QuestionsReact'
import vid from '../components/background.mp4'; 

const QuizReact = () => {
    
    function onNext(){
        console.log('on next click')
    }
    function onPrev(){
        console.log('on prev click')
    }
  return (
    <div className='background-container'>
    <video className='background-video' autoPlay loop muted>
        <source src={vid} type='video/mp4' />
        Your browser does not support the video tag.
    </video>
    <div className='center-container'>
    <div className='container-react-quiz container-dark' style={{width:'1200px',height:'500px'}}>
        <h1 className='title-react-quiz text-light'>Quiz React Application</h1>
        {/*display questions*/}
        <QuestionsReact/>
        <div className='button-container'>
                <button className='prev-button'>Previous</button>
                <button className='next-button'>Next</button>
            </div>
    </div>
    </div>
    </div>
  )
}

export default QuizReact