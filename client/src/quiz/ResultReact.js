import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './ResultReact.css'
import { pushResultAction } from '../redux/result_react_reducers';

import ResultReactTable from './ResultReactTable';
import { ResetAllAction } from '../redux/question_reacr_reducers';
import { resetResultAction } from '../redux/result_react_reducers';
import {useDispatch,useSelector} from 'react-redux'
import { attemps_Number, earnPoints_Number ,flagResult} from '../helper/helper';
import { answersCorrect} from '../database/datareact'; // Import the answers array
import { usePublishResult } from '../hooks/setResultReact';

const ResultReact = () => {
  const dispatch=useDispatch()
 
  
  function onRestart(){
    dispatch(ResetAllAction())
    dispatch(resetResultAction())
  }
  
  const {queue,answers}=useSelector(state=>state.questions)
  const { result, userId } = useSelector(state => state.result);
  const [username, setUsername] = useState(''); // State to hold the username
  const [showEmailModal, setShowEmailModal] = useState(false); // State for showing email modal

  // Calculate various metrics based on the answers and result arrays
  const totalQuestions = answers.length;
  const totalPoints = totalQuestions * 10;
  const totalAttempts = result.filter(r => r !== undefined).length;

  // Calculate earned points
  const earnPoints = answers.reduce((total, element, i) => {
    return total + (answersCorrect[i] === element ? 10 : 0);
  }, 0);
  const flag=flagResult(totalPoints,earnPoints)
  useEffect(() => {
    dispatch(pushResultAction(answers)); // Dispatch the action with the answers array

    // Retrieve username from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.name) {
      setUsername(userInfo.name); // Set the username state with the retrieved username
    }
  }, [dispatch, answers]);
usePublishResult({result:answers,username:userId,totalAttempts,points:earnPoints,achived:flag?"Passed":"Fail"})

  return (
    <div className='result-container'>
        <h1 className='title-react-quiz text-light'>Quiz React Application</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points:</span>
                <span className='bold'>{totalPoints}</span>
            </div>
            <div className='flex'>
                <span>Total Questions:</span>
                <span className='bold'>{answers.length}</span>
            </div>
            <div className='flex'>
                <span>Total Attemps:</span>
                <span className='bold'>{totalAttempts}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points:</span>
                <span className='bold'>{earnPoints}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result:</span>
                <span className='bold'>{flag ? <h2 style={{color:'#0dff92'}}>Passed</h2> : <h2 style={{color:'red'}}>Failed</h2>}
                  
</span>
            </div>
        </div>
        <div className='start'>
          <Link className='btn' to='/mainQuizReact' onClick={onRestart}>Restart</Link>
        </div>
<div className='table-react-container'>
<ResultReactTable totalAttempts={totalAttempts} />
</div>
    </div>
  )
}

export default ResultReact