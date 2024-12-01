import { useEffect, useState } from "react";
import {
  HiArrowUp,
  HiArrowDown,
  HiOutlinePlay,
  HiOutlinePause,
  HiRefresh,
} from "react-icons/hi";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionTime, setSessionTime] = useState(sessionLength * 60);
  const [isClockWorking, setIsClockWorking] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const alarm = new Audio("alarm.mp3");

  const startStopClock = () => setIsClockWorking((prev) => !prev);
  const resetClock = () => {
    setBreakLength(5);
    setSessionLength(25);
    setSessionTime(25 * 60);
    setIsClockWorking(false);
  };

  useEffect(() => {
    let interval;
    if (isClockWorking) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTime, isClockWorking]);
  useEffect(() => {
    if (sessionTime < 0) {
      alarm.play();
      if (!isBreak) {
        setSessionTime(breakLength * 60);
        setIsBreak(true);
      } else {
        setSessionTime(sessionLength * 60);
        setIsBreak(false);
      }
    }
  }, [sessionTime, isBreak]);

  return (
    <div className="text-capitalize text-light text-center">
      <h1>25 + 5 clock</h1>
      <div className="options">
        <div className="option">
          <h3 id="break-label">Break Length</h3>
          <div className="row">
            <button
              id="break-increment"
              className="btn btn-light col"
              onClick={() =>
                setBreakLength(
                  breakLength >= 60 ? breakLength : breakLength + 1
                )
              }
            >
              <HiArrowUp />
            </button>
            <h3 className="col" id="break-length">
              {breakLength}
            </h3>
            <button
              id="break-decrement"
              className="btn btn-light col"
              onClick={() =>
                setBreakLength(breakLength <= 1 ? breakLength : breakLength - 1)
              }
            >
              <HiArrowDown />
            </button>
          </div>
        </div>
        <div className="option">
          <h3 id="session-label">Session Length</h3>
          <div className="row">
            <button
              id="session-increment"
              className="btn btn-light col"
              onClick={() => {
                setSessionLength(
                  sessionLength >= 60 ? sessionLength : sessionLength + 1
                );
                setSessionTime(
                  (sessionLength >= 60 ? sessionLength : sessionLength + 1) * 60
                );
              }}
            >
              <HiArrowUp />
            </button>
            <h3 id="session-length" className="col">
              {sessionLength}
            </h3>
            <button
              id="session-decrement"
              className="btn btn-light col"
              onClick={() => {
                setSessionLength(
                  sessionLength <= 1 ? sessionLength : sessionLength - 1
                );
                setSessionTime(
                  (sessionLength <= 1 ? sessionLength : sessionLength - 1) * 60
                );
              }}
            >
              <HiArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="border border-light rounded p-3 m-3">
        <h3 id="timer-label">{isBreak ? "break" : "session"}</h3>
        <div
          id="time-left"
          className={`h1 ${sessionTime < 60 && "text-danger"}`}
        >{`${Math.floor(sessionTime / 60)}:${sessionTime % 60}`}</div>
      </div>
      <div className="control d-flex align-items-center justify-content-center gap-3">
        <button
          id="start_stop"
          className="btn btn-light"
          onClick={startStopClock}
        >
          <HiOutlinePlay />|<HiOutlinePause />
        </button>
        <button id="reset" className="btn btn-light" onClick={resetClock}>
          <HiRefresh />
        </button>
      </div>
    </div>
  );
}

export default App;
