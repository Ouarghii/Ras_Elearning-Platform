import React, { useEffect, useState } from 'react';
import './Question.css';
import { useSelector ,useDispatch} from 'react-redux';

/**Custom Hool **/
import { useFetchQuestionReact } from '../../hooks/FetchQuestionReact';

const QuestionsReact = ({onChecked}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [getData, setGetData, moveNextQuestion, movePrevQuestion] = useFetchQuestionReact();
    const { isLoading, apiData, serverError } = getData;
    useSelector(state=>console.log(state))
    const { queue, trace } = useSelector(state => state.questions);
    const result=useSelector(state=>state.result.result)
    const dispatch=useDispatch()
    const onSelect = (optionIndex) => {
        console.log(optionIndex);
        setSelectedOption(optionIndex);
        onChecked(optionIndex)
    };

    const currentQuestion = queue.length > 0 && trace >= 0 && trace < queue.length ? queue[trace] : null;

    useEffect(() => {
        // console.log(isLoading);
        // console.log(apiData);
        // console.log(serverError);
    }, [isLoading]);

    if (isLoading) return <h3 className='text-light'>isLoading</h3>
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

    return (
        <div className='questions'>
            {currentQuestion && (
                <div className='question-header'>
                    <h2 className='text-light question-text' style={{ color: 'black', fontWeight: '600', marginBottom: '50px', textAlign: 'center' }}>
                        {currentQuestion.id} : {currentQuestion.question}
                    </h2>
                    <div className='question-line'></div>
                </div>
            )}
            {currentQuestion && (
                <ul className='lu' key={currentQuestion.id} style={{ listStyleType: 'none' }}>
                    {currentQuestion.options.map((q, i) => (
                        <li key={`${currentQuestion.id}-${i}`} className='il'>
                            <label className='option-label' htmlFor={`q${i}-option`}>
                                <input
                                    type='radio'
                                    checked={i === selectedOption}
                                    name='options'
                                    id={`q${i}-option`}
                                    onChange={() => onSelect(i)}
                                />
<div className={`check ${i === selectedOption ? 'checked' : ''}`}></div> {q}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuestionsReact;
