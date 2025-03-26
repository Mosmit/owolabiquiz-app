import {useState, useCallback} from 'react';
import {flushSync} from 'react-dom';
import CircularTimer from './CircularTimer';

function Question({question, totalQuestions, currentQuestion, setAnswer}){
    const [selectedOption, setSelectedOption] = useState(null);
    
    const gotoNextQuestion = useCallback(() => {
        flushSync(() => {
            setAnswer(selectedOption);
        });
        setSelectedOption(null);
    }, [selectedOption, setAnswer]);

    return(
        <div className='question'>
            <CircularTimer duration={30} onTimerEnd={gotoNextQuestion} />
            
            <div className='question-count'>
                <b>{currentQuestion}</b>
                of
                <b>{totalQuestions}</b>
            </div>
            
            <div className='main'>
                <div className='title'>
                    <span>Question:</span>
                    <p>{question.title}</p>
                </div>
                <div className='options'>
                    {question.options.map((option,index)=>{
                        return(
                            <div 
                                className={index === selectedOption ? 'option active' : 'option'}
                                key={index}
                                onClick={()=>setSelectedOption(index)}
                            >
                                {option}
                            </div>    
                        );
                    })}
                </div>
            </div>
            <div className='control'>
                <button onClick={gotoNextQuestion}>Next</button>
            </div>
        </div>
    );
}

export default Question;