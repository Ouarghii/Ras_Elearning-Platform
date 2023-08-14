import { createSlice } from "@reduxjs/toolkit";

const resultReactReducer = createSlice({
    name: 'result',
    initialState: {
        // Initial state for result
        userId:null,
        answer:[],
        result:[]
    },
    reducers: {
        // Reducer actions for result
        setUserId:(state,action)=>{
            state.userId=action.payload
        },
        pushResultAction: (state, action) => {
            const answerIndex = action.payload; // Answer index passed as payload
            return {
              ...state,
              result: [...state.result, answerIndex]
            };
          },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload;
            state.result[trace] = checked;
        },
        
        resetResultAction:()=>{
            return {
                userId:null,
               result:[]
            }
        }
    },
    
});

export const { setUserId,pushResultAction,resetResultAction,updateResultAction } = resultReactReducer.actions;
export default resultReactReducer.reducer;