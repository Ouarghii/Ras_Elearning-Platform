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
            const { queue } = action.payload; // Extract the questions array from the payload
            return {
                ...state,
                queue,
                answers: [] // Set the initialized answers array
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
            state.answers = action.payload;
        },
    }
});

export const { startExamAction ,moveNextAction,movePrevAction,ResetAllAction,updateAnswersAction} = questionNodeReducer.actions; // Change the export names
export default questionNodeReducer.reducer; // Change the export default
