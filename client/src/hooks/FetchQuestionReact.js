import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import datareact from "../database/datareact";
import * as Action from '../redux/question_reacr_reducers';


export const useFetchQuestionReact = () => {
    const [getData, setData] = useState({ isLoading: false, apiData: [], serverError: null });
    const dispatch = useDispatch();

    useEffect(() => {
        setData(prevData => ({ ...prevData, isLoading: true }));

        (async () => {
            try {
                const question = await datareact;
if (question.length > 0) {
    const initialAnswers = new Array(question.length).fill(null);
    setData(prevData => ({ ...prevData, isLoading: false, apiData: question }));
    dispatch(Action.startExamAction({ queue: question, answers: initialAnswers }));
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

 