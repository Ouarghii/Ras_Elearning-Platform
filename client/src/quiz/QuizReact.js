import React, { useEffect, useState } from 'react';
import QuestionsReact from './components/QuestionsReact';
import vid from '../components/background.mp4';
import { useSelector, useDispatch } from 'react-redux';
import { moveNextAction, movePrevAction, startExamAction } from '../redux/question_reacr_reducers';
import datareact, { answersCorrect } from '../database/datareact';
import { PushAnswerReact } from '../hooks/setResultReact';
import { pushResultAction } from '../redux/result_react_reducers';
import { useHistory } from 'react-router-dom';

const QuizReact = () => {
    const questionsState = useSelector(state => state.questions);
    const resultsState = useSelector(state => state.result);
    const trace = useSelector(state => state.questions.trace);
    const dispatch = useDispatch();
    const [check, setChecked] = useState(undefined);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const question = await datareact;
                if (question.length > 0) {
                    const initialAnswers = []; // Initialize as an empty array
                    dispatch(startExamAction({ queue: question, answers: initialAnswers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, [dispatch]);

    const onNext = async () => {
        if (trace !== questionsState.queue.length) {
            if (check !== undefined) {
                dispatch(PushAnswerReact(check,history));
                const correctAnswer = answersCorrect[trace];
                const selectedAnswer = check;
                const isCorrect = correctAnswer === selectedAnswer;
                const points = isCorrect ? 1 : 0;
                // console.log('Points:', points);
                dispatch(moveNextAction());
            } else {
                setChecked(undefined)
            }
        }
        
    };

    const onPrev = () => {
        console.log('on prev click');
        if (trace > 0) {
            dispatch(movePrevAction());
        }
    };

    function onChecked(check) {
        setChecked(check);
    }



   

    useEffect(() => {
        console.log(questionsState.answers.length);
        // console.log(resultsState.result.length === 0 ? 0 : questionsState.answers);
        console.log(questionsState.queue.length);
        console.log("trace:"+ trace +" "+ "Result Array:"+questionsState.answers)
        console.log(questionsState.answers);
    
        if (questionsState.answers.length === 15) {
            history.replace('/ResultReact');
        }
    }, [questionsState.answers, questionsState.queue, history]);

    


    return (
        <div className='background-container'>
            <video className='background-video' autoPlay loop muted>
                <source src={vid} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='center-container'>
                <div className='container-react-quiz container-dark' style={{ width: '1200px', height: '500px' }}>
                    <h1 className='title-react-quiz text-light'>Quiz React Application</h1>
                    <QuestionsReact onChecked={onChecked} />
                    <div className='button-container'>
                        <button className='prev-button' onClick={onPrev}>Previous</button>
                        <button className='next-button' onClick={onNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizReact;
