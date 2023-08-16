import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../redux/question_node_reducers'; // Update with the correct path to your question_node_reducers
import { getServerData } from "../helper/helper";

export const useFetchQuestionNode = () => {
    const dispatch = useDispatch();
    const { queue } = useSelector(state => state.questionsNode);
    const [getData, setData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setData(prevData => ({ ...prevData, isLoading: true }));

        (async () => {
            try {
                const [{ questions,answers }] = await getServerData('http://localhost:5000/api/nodequiz/questionsNode', (data) => data);
                console.log({ questions });

                if (questions.length > 0) {
                    const initialAnswers = new Array(questions.length).fill(null);
                    setData(prevData => ({ ...prevData, isLoading: false, apiData: questions }));

                    dispatch(Actions.startExamAction({ queue: questions, answers: initialAnswers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                console.log(error);
                setData(prevData => ({ ...prevData, isLoading: false, serverError: error }));

            }
        })();
    }, [dispatch, queue.length]); // Only fetch data when the queue length is 0 (initial load)

    return [getData, setData];
};
        

    
export const moveNextQuestion = () => async (dispatch, getState) => {
    try {
        dispatch(Actions.moveNextAction());
        const newState = getState().questionsNode; // Access the correct state slice
        // Perform further logic if needed
        // For example, you can check if the current question is the last one and handle it accordingly
        if (newState.trace === newState.queue.length - 1) {
            console.log("Last question reached!");
        }
    } catch (error) {
        console.log(error);
    }
};

export const movePrevQuestion = () => async (dispatch, getState) => {
    try {
        dispatch(Actions.movePrevAction());
        const newState = getState().questionsNode; // Access the correct state slice
        // Perform further logic if needed
        // For example, you can check if the current question is the first one and handle it accordingly
        if (newState.trace === 0) {
            console.log("First question reached!");
        }
    } catch (error) {
        console.log(error);
    }
};