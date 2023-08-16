import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReactReducer from './question_reacr_reducers';
import resultReactReducer from './result_react_reducers';
import questionNodeReducer from './question_node_reducers'; // Update with the correct path
import resultNodeReducer from './result_node_reducers'; // Update with the correct path
const rootReducer = combineReducers({
    questions: questionReactReducer,
    result: resultReactReducer,
    questionsNode: questionNodeReducer,
    resultNode: resultNodeReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;