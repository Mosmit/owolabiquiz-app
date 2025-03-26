import {useState, useEffect} from 'react';
import QuestionList from './questions.json';
import QuizResult from './QuizResult.js';
import Question from './Question.js';

function QuizScreen({retry}){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const isQuestionEnd = currentQuestionIndex === selectedQuestions.length;

    // Shuffle and select 5 random questions when component mounts or retry is called
    useEffect(() => {
        const shuffledQuestions = [...QuestionList]
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
        setSelectedQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setMarkedAnswers([]);
    }, [retry]); // This effect runs whenever retry changes

    function calculateResult(){
        if (selectedQuestions.length === 0) return {
            total: 0,
            correct: 0,
            percentage: 0
        };

        let correct = 0;
        selectedQuestions.forEach((question, index) => {
            if (question.correctOptionIndex === markedAnswers[index]) {
                correct++;
            }
        });
        return {
            total: selectedQuestions.length,
            correct: correct,
            percentage: Math.trunc((correct / selectedQuestions.length) * 100)
        };
    }

    if (selectedQuestions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <div className='quiz-screen'>
            {
                isQuestionEnd ? (
                    <QuizResult
                        result={calculateResult()}
                        retry={retry}
                    />
                ) : (
                    <Question
                        question={selectedQuestions[currentQuestionIndex]}
                        totalQuestions={selectedQuestions.length}
                        currentQuestion={currentQuestionIndex + 1}
                        setAnswer={(index) => {
                            setMarkedAnswers(arr => {
                                let newArr = [...arr];
                                newArr[currentQuestionIndex] = index;
                                return newArr;
                            });
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                        }}
                    />
                )
            }
        </div>
    );
}

export default QuizScreen;