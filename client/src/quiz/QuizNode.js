import React, { useEffect, useState } from 'react';
import QuestionsNode from './components/QuestionsNode'; // Update with the correct path to your Node-specific question component
import vid from '../components/background.mp4';
import { useSelector, useDispatch } from 'react-redux';
import { moveNextAction, movePrevAction, startExamAction } from '../redux/question_node_reducers'; // Update with the correct path
import { pushResultAction } from '../redux/result_node_reducers'; // Update with the correct path
import { useHistory } from 'react-router-dom';
import { getServerData } from '../helper/helper';
import { answersCorrectNode } from '../database/datanode'; // Make sure you import answersCorrectNode
import * as Actions from '../redux/question_node_reducers'; // Update with the correct path to your question_node_reducers

const QuizNode = () => {
    const questionsState = useSelector(state => state.questionsNode); // Update with the correct state
    const trace = useSelector(state => state.questionsNode.trace); // Update with the correct state
    const dispatch = useDispatch();
    const [check, setChecked] = useState(undefined);
    const history = useHistory();
    const [getData, setData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {

        (async () => {
            try {
                const [{ questions, answers }] = await getServerData('http://localhost:5000/api/nodequiz/questionsNode', (data) => data);
                console.log({ questions, answers });

                if (questions.length > 0) {
                    const initialAnswers = new Array(questions.length).fill(null);

                    dispatch(Actions.startExamAction({ queue: questions, answers: initialAnswers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                console.log(error);

            }
        })();
    }, [dispatch]);

    const onNext = async () => {
        if (trace !== questionsState.queue.length) {
            if (check !== undefined) {
                dispatch(pushResultAction(check, history)); // Update with the correct dispatch action
                const correctAnswer = answersCorrectNode[trace]; // Update with the correct array for correct answers
                const selectedAnswer = check;
                const isCorrect = correctAnswer === selectedAnswer;
                const points = isCorrect ? 1 : 0;
                // console.log('Points:', points);
                dispatch(moveNextAction());
            } else {
                setChecked(undefined);
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
        console.log("trace:" + trace + " " + "Result Array:" + questionsState.answers);
        console.log(questionsState.answers);

        if (questionsState.answers.length === 15) { // Update with the correct number of questions
            history.replace('/ResultNode'); // Update with the correct route for the result page
        }
    }, [questionsState.answers, questionsState.queue, history]);

    return (
        <div className='background-container'>
            <video className='background-video' autoPlay loop muted>
                <source src={vid} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='center-container'>
                <div className='container-node-quiz container-dark' style={{ width: '1200px', height: '500px' }}>
                    <h1 className='title-node-quiz text-light'>Quiz Node Application</h1>
                    <QuestionsNode onChecked={onChecked} />
                    <div className='button-container'>
                        <button className='prev-button' onClick={onPrev}>Previous</button>
                        <button className='next-button' onClick={onNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizNode;
