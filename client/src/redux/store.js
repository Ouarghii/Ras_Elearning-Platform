import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReactReducer from './question_reacr_reducers';
import resultReactReducer from './result_react_reducers';

const rootReducer = combineReducers({
    questions: questionReactReducer,
    result: resultReactReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;