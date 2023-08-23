import { createSlice } from "@reduxjs/toolkit";

const questionNodeReducer = createSlice({
    name: 'questionsNode', // Change the name to 'questionsNode'
    initialState: {
        queue: [],
        answers: [],
        trace: 0
    },
    reducers: {
        startExamAction: (state, action) => {
            const { queue } = action.payload;
            const initialAnswers = new Array(queue.length).fill(null); // Initialize answers array
            return {
                ...state,
                queue,
                answers: initialAnswers
            };
        },
        moveNextAction:(state)=>{
            return {
                ...state,
                trace:state.trace+1
            }
        },
        movePrevAction:(state)=>{
            return {
                ...state,
                trace:state.trace-1
            }
        },ResetAllAction: ()=>{
            return{
                queue: [],
                answers: [],
                trace: 0
            }
        },updateAnswersAction: (state, action) => {
            const newAnswers = action.payload;
            state.answers = newAnswers;
        },
    }
});

export const { startExamAction ,moveNextAction,movePrevAction,ResetAllAction,updateAnswersAction} = questionNodeReducer.actions; // Change the export names
export default questionNodeReducer.reducer; // Change the export default
