import React, { useEffect, useState } from 'react';
import './Question.css';
import { useSelector, useDispatch } from 'react-redux';

/** Custom Hook **/
import { useFetchQuestionNode } from '../../hooks/FetchQuestionNode'; // Update with your Node-specific hook

const QuestionNode = ({ onChecked }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const fetchData = useFetchQuestionNode(); // Use as an object
    const { isLoading, apiData, serverError } = fetchData;
    const { queue, trace } = useSelector(state => state.questionsNode);
    const result = useSelector(state => state.resultNode.result);
    const dispatch = useDispatch();

    const onSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
        onChecked(optionIndex);
    };

    const currentQuestion = queue.length > 0 && trace >= 0 && trace < queue.length ? queue[trace] : null;

    if (isLoading) return <h3 className='text-light'>isLoading</h3>;
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>;

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

export default QuestionNode;
