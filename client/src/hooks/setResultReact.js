import * as Action from '../redux/question_reacr_reducers';
import { pushResultAction ,updateResultAction} from '../redux/result_react_reducers';
import { moveNextAction, movePrevAction, startExamAction } from '../redux/question_reacr_reducers';
import { updateAnswersAction } from '../redux/question_reacr_reducers'; // Import the action to update answers
import { postServerData } from '../helper/helper';

export const PushAnswerReact = (result) => async (dispatch, getState, history) => {
    try {
        const { questions } = getState();
        const updatedTrace = questions.trace;
        const updatedAnswersArray = [...questions.answers];

        // Update answers in the store
        updatedAnswersArray[updatedTrace] = result; // Set the selected answer for the current trace
        dispatch(updateAnswersAction(updatedAnswersArray)); // Dispatch an action to update the answers

        // Check if all questions are answered
        if (updatedAnswersArray.filter(answer => answer !== null).length === questions.queue.length) {
            history.push('/ResultReact');
        }
    } catch (error) {
        console.log(error);
    }
};


export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
  
    (async () => {
      try {
        if (!result || !username) {
          throw new Error("Couldn't get Result");
        }
        await postServerData('http://localhost:5000/api/reactquiz/resultReact', resultData, (data) => data);
      } catch (error) {
        console.log(error);
      }
    })();
  };





