import { useEffect, useState } from "react";
import { TimerProps } from "../utils/types";

function Timer({ onTimesUp }: TimerProps) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds by 1
      setSeconds((prevSeconds) => prevSeconds - 1);

      // When seconds reach 0
      if (seconds === 0) {
        clearInterval(interval);

        // Notify the parent component that times up
        if (onTimesUp) {
          onTimesUp();
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds, onTimesUp]); // Re-run this effect whenever 'seconds' or 'onTimesUp' changes

  return (
    <div className="container">
      {/* <div className="card"> */}
      <div className="countdown-text">
        {/* Display countdown timer if seconds are greater than 0 */}
        {seconds > 0 ? (
          <p>
            Time Remaining:{" "}
            <span style={{ fontWeight: 600 }}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        ) : (
          // Display if countdown timer reaches 0
          <p>Times Up!</p>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Timer;
