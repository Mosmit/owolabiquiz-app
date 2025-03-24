function JoinScreen({start}){
    return (
        <div className='join-screen'>
            <h2>Join Quiz</h2>
            <p>Welcome to the Quiz designed and created by Owolabi</p>
            <button onClick={start}>Start</button>
        </div>
    );
}

export default JoinScreen;