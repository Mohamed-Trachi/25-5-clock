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
          <h3>break length</h3>
          <div className="row">
            <button
              className="btn btn-light col"
              onClick={() => setBreakLength(breakLength + 1)}
            >
              <HiArrowUp />
            </button>
            <h3 className="col">{breakLength}</h3>
            <button
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
          <h3>session length</h3>
          <div className="row">
            <button
              className="btn btn-light col"
              onClick={() => {
                setSessionLength(sessionLength + 1);
                setSessionTime((sessionLength + 1) * 60);
              }}
            >
              <HiArrowUp />
            </button>
            <h3 className="col">{sessionLength}</h3>
            <button
              className="btn btn-light col"
              onClick={() => {
                setSessionLength(
                  sessionLength <= 1 ? sessionLength : sessionLength - 1
                );
                setSessionTime((sessionLength - 1) * 60);
              }}
            >
              <HiArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="border border-light rounded p-3 m-3">
        <h3>{isBreak ? "break" : "session"}</h3>
        <div
          className={`h1 ${sessionTime < 60 && "text-danger"}`}
        >{`${Math.floor(sessionTime / 60)}:${sessionTime % 60}`}</div>
      </div>
      <div className="control d-flex align-items-center justify-content-center gap-3">
        <button className="btn btn-light" onClick={startStopClock}>
          <HiOutlinePlay />|<HiOutlinePause />
        </button>
        <button className="btn btn-light" onClick={resetClock}>
          <HiRefresh />
        </button>
      </div>
    </div>
  );
}

export default App;
