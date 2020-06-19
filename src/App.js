import React, { Component } from 'react'
import './App.css';
import BreakSessionLength from './Components/BreakSessionLength';
import Session from './Components/Session';

const audio = document.getElementById('beep');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
    this.state = ({
      isSession: true,
      hasStarted: false,
      isPlaying: false,
      breakLength: 5,
      sessionLength: 25,
      clockCount: 25 * 60
    })
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      })
    } else {
      this.setState({
        isPlaying: true,
        hasStarted: true
      });
      this.loop = setInterval(() => {
        const { 
          clockCount, 
          isSession, 
          breakLength, 
          sessionLength 
        } = this.state;
        if (clockCount === 0) {
          this.setState({
            isSession: isSession ? false : true,
            clockCount: isSession ? (breakLength * 60) : (sessionLength * 60)
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
  }

  handleReset = () => {
    this.setState({
      hasStarted: false,
      isPlaying: false,
      isSession: true,
      breakLength: 5,
      sessionLength: 25,
      clockCount: 25 * 60
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0; 
  }

  handleBreakDecrement = () => {
    if(this.state.breakLength > 1 && !this.state.hasStarted) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength - 1
      }))
    }
  }
  handleBreakIncrement = () => {
    if(this.state.breakLength < 60 && !this.state.hasStarted) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength + 1
      }))
    }
  }
  handleSessionDecrement = () => {
    if(this.state.sessionLength > 1 && !this.state.hasStarted) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength - 1,
        clockCount: (prevState.sessionLength - 1) * 60
      }))
    }
    }
  handleSessionIncrement = () => {
    if(this.state.sessionLength < 60 && !this.state.hasStarted) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength + 1,
        clockCount: (prevState.sessionLength + 1) * 60
      }))
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="flex">
          <BreakSessionLength 
            id="break-label"
            title="Break Length"
            decrementId="break-decrement"
            incrementId="break-increment"
            idLength="break-length"
            length={this.state.breakLength}
            handleDecrement={this.handleBreakDecrement}
            handleIncrement={this.handleBreakIncrement} />
          <BreakSessionLength 
            id="session-label"
            title="Session Length"
            decrementId="session-decrement"
            incrementId="session-increment"
            idLength="session-length"
            length={this.state.sessionLength}
            handleDecrement={this.handleSessionDecrement}
            handleIncrement={this.handleSessionIncrement} />
        </div>
        <Session 
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
          clockCount={this.state.clockCount}
          isSession={this.state.isSession}
          isPlaying={this.state.isPlaying}
          handlePlayPause={this.handlePlayPause}
          handleReset={this.handleReset} />
      </div>
    )
  }
}
