import {useState, useEffect, useRef, useCallback} from 'react';
import {flushSync} from 'react-dom';

function Question({question, totalQuestions, currentQuestion, setAnswer}){
    const [selectedOption, setSelectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);

    const gotoNextQuestion = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        flushSync(() => {
            setAnswer(selectedOption);
        });
        setSelectedOption(null); // Reset the selected option to null
    }, [selectedOption, setAnswer]);

    useEffect(() => {
        // Ensure progressBar.current is not null before interacting with it
        if (progressBar.current) {
            progressBar.current.classList.remove('active');
            setTimeout(() => {
                if (progressBar.current) {
                    progressBar.current.classList.add('active');
                }
            }, 0);
        }

        // Set the timeout to go to the next question after 10 seconds
        timer.current = setTimeout(gotoNextQuestion, 10 * 1000);

        // Cleanup the timeout when the effect runs again or on unmount
        return () => {
            clearTimeout(timer.current);
        };
    }, [question, gotoNextQuestion]); // Make sure to include gotoNextQuestion in the dependency array
    return(
        <div className='question'>
            <div className='progress-bar' ref={progressBar}></div>
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
                    {
                        question.options.map((option,index)=>{
                            return(
                                <div 
                                    className={index === selectedOption ? 'option active' : 'option'}
                                    key={index}
                                    onClick={()=>setSelectedOption(index)}
                                >
                                    {option}
                                </div>    
                            );
                        })
                    }
                </div>
            </div>
            <div className='control'>
                <button onClick={gotoNextQuestion}>Next</button>
            </div>
        </div>
    );
}

export default Question;