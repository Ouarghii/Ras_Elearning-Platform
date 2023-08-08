import React, { useEffect, useState } from 'react';
import './Question.css';
import data from '../../database/datareact';

const QuestionsReact = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const onSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    

    const question = data[0];

    useEffect(() => {
        console.log(question);
    }, []);

    return (
        <div className='questions'>
            <div className='question-header'>
                <h2 className='text-light question-text' style={{color:'black',fontWeight:'600',marginBottom:'50px',textAlign:'center'}}>
                    {question.id} : {question.question}
                </h2>
                <div className='question-line'></div>
            </div>
            <ul className='lu' key={question.id} style={{ listStyleType: 'none' }}>
                {question.options.map((q, i) => (
                    <li key={i} className='il'>
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
        </div>
    );
};

export default QuestionsReact;