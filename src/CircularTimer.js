import { useEffect, useRef } from 'react';

function CircularTimer({ duration, onTimerEnd }) {
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const timeLeftRef = useRef(duration);
  
  useEffect(() => {
    const circumference = 2 * Math.PI * 27; // 27 is the radius (60px width/2 - 6px stroke width)
    
    // Initialize the timer
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      textRef.current.textContent = timeLeftRef.current;
      
      // Update progress circle
      const offset = circumference - (timeLeftRef.current / duration) * circumference;
      progressRef.current.style.strokeDashoffset = offset;
      
      // Change color when time is running out
      if (timeLeftRef.current <= 5) {
        progressRef.current.style.stroke = 'orangered';
      }
      
      // Timer ended
      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current);
        onTimerEnd();
      }
    }, 1000);
    
    // Set initial state
    progressRef.current.style.strokeDasharray = circumference;
    progressRef.current.style.strokeDashoffset = 0;
    textRef.current.textContent = duration;
    
    return () => {
      clearInterval(timerRef.current);
    };
  }, [duration, onTimerEnd]);
  
  return (
    <div className="circular-timer">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle className="timer-background" cx="30" cy="30" r="27"></circle>
        <circle 
          ref={progressRef} 
          className="timer-progress" 
          cx="30" 
          cy="30" 
          r="27"
        ></circle>
      </svg>
      <div ref={textRef} className="timer-text"></div>
    </div>
  );
}

export default CircularTimer;