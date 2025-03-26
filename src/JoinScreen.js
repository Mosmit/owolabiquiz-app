function JoinScreen({start}){
    return (
        <div className='join-screen'>
            <h2>Welcome to the Quiz</h2>
            <p>Welcome to the Quiz designed and created by Owolabi.<br/> <span className="mos">You will get 5 random questions each time you play</span></p>
            <button onClick={start}>Start</button>
        </div>
    );
}

export default JoinScreen;