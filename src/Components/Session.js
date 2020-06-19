import React from 'react';

const convertToTime = (count) => {
  let minutes = Math.floor(count / 60);
  let seconds = count % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return `${minutes}:${seconds}`
}

const Session = (props) => {
  return (
    <div id="timer-label">
      <h1>{props.isSession ? 'Session' : 'Break'}</h1>
      <h4 id="time-left">{convertToTime(props.clockCount)}</h4>
      <button 
        className="btn"
        id="start_stop"
        onClick={props.handlePlayPause}>
          <i className={`fas fa-${props.isPlaying ? 'pause' : 'play'}`}></i>
      </button>
      <button 
        className="btn"
        id="reset"
        onClick={props.handleReset}>
          <i class="fas fa-sync"></i>
      </button>
    </div>
  );
};

export default Session;