function QuizResult({result, retry}){
    return(
        <div className='result-screen'>
            <h2>Result: {result.percentage}%</h2>
            <p>You got {result.correct} out of {result.total} questions correct.</p>
            <button onClick={retry}>Retry</button>
        </div>
    )
}

export default QuizResult;