import {useState} from "react";

import Navbar from './Navbar'
import QuizScreen from './QuizScreen';
import JoinScreen from './JoinScreen';

function App(){
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <>
    <Navbar/>
    <div className='quiz-container'>
      {
        isQuizStarted ? (
          <QuizScreen retry={()=>setIsQuizStarted(false)}/>
        ) : (
          <JoinScreen start={()=>setIsQuizStarted(true)}/>
        )
      }
    </div>
    </>
  );
}

export default App;