import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as Action from '../redux/question_reacr_reducers';
import { getServerData } from "../helper/helper";


export const useFetchQuestionReact = () => {
    const [getData, setData] = useState({ isLoading: false, apiData: [], serverError: null });
    const dispatch = useDispatch();

    useEffect(() => {
        setData(prevData => ({ ...prevData, isLoading: true }));

        (async () => {
            try {
                const [{questions,answers}]=await getServerData('http://localhost:5000/api/reactquiz/questionsReact',(data)=>data)
                console.log( {questions,answers});

if (questions.length > 0) {
    const initialAnswers = new Array(questions.length).fill(null);
    setData(prevData => ({ ...prevData, isLoading: false, apiData: questions }));
    dispatch(Action.startExamAction({queue:questions,answers}));
} else {
    throw new Error("No Question Available");
}
            } catch (error) {
                setData(prevData => ({ ...prevData, isLoading: false, serverError: error }));
            }
        })();
    }, [dispatch]);

    return [getData, setData];
}



/** Move  Dipatch function */

export const moveNextQuestion = () => async (dispatch, getState) => {
    try {
        dispatch(Action.moveNextAction());
        // Update state using getState() and new state
        const newState = getState().questions;
        // Perform further logic if needed
    } catch (error) {
        console.log(error);
    }
};
export const movePrevQuestion = () => async (dispatch, getState) => {
    try {
        dispatch(Action.movePrevAction());
        // Update state using getState() and new state
        const newState = getState().questions;
        // Perform further logic if needed
    } catch (error) {
        console.log(error);
    }
};

 