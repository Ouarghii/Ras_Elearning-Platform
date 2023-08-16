import { createSlice } from "@reduxjs/toolkit";

const resultNodeReducer = createSlice({
    name: 'resultNode', // Change the name to 'resultNode'
    initialState: {
        // Initial state for resultNode
        userId: null,
        result: []
    },
    reducers: {
        // Reducer actions for resultNode
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        pushResultAction: (state, action) => {
            const answerIndex = action.payload; // Answer index passed as payload
            state.result.push(answerIndex);
        },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload;
            state.result[trace] = checked;
        },
        resetResultAction: () => {
            return {
                userId: null,
                result: []
            };
        }
    },
});

export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultNodeReducer.actions;
export default resultNodeReducer.reducer;
