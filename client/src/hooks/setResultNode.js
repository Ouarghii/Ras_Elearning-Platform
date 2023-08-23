import { updateAnswersAction } from '../redux/question_reacr_reducers';
import { postServerData } from '../helper/helper';

export const PushAnswerNode = (result) => async (dispatch, getState, history) => {
    try {
        const { questionsNode } = getState();
        const updatedTrace = questionsNode.trace;
        const updatedAnswersArray = [...questionsNode.answers];

        // Update answers in the store
        updatedAnswersArray[updatedTrace] = result; // Set the selected answer for the current trace
        dispatch(updateAnswersAction(updatedAnswersArray)); // Dispatch an action to update the answers

        // Check if all questions are answered
        if (updatedAnswersArray.filter(answer => answer !== null).length === questionsNode.queue.length) {
            history.push('/ResultNode'); // Update the route for Node-based result
        }
    } catch (error) {
        console.log(error);
    }
};

export const usePublishResultNode = (resultData) => {
    const { result, username } = resultData;

    (async () => {
        try {
            if (!result || !username) {
                throw new Error("Couldn't get Result");
            }
            await postServerData('http://localhost:5000/api/nodequiz/resultNode', resultData, (data) => data); // Update the API endpoint for Node-based result
        } catch (error) {
            console.log(error);
        }
    })();
};