import { useEffect, useState, useRef } from "react";

function Question({ question, onAnswered }) {
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const timeoutRef = useRef(null); // ✅ useRef for timeout ID

  useEffect(() => {
    if (secondsRemaining > 0) {
      timeoutRef.current = setTimeout(() => {
        setSecondsRemaining((seconds) => seconds - 1);
      }, 1000);
    } else {
      onAnswered(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // ✅ clears the correct timeout
      }
    };
  }, [secondsRemaining, onAnswered]);

  return (
    <div>
      <p>{secondsRemaining} seconds remaining</p>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
