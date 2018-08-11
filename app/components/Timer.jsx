const React = require('react');
const accurateInterval = require('accurate-interval');
const TimerLengthControl = require('./TimerLengthControl');
// a lot of code/inspiration was from here: https://codepen.io/freeCodeCamp/pen/XpKrrW?editors=0010
const styles = require('../style.css');


/* Attempt to put the length control on another page, it would append to this list which would then be mapped as a component later
var lengthControlList = [
  {0: "Jump Rope", length: 1, type: "Session", forClick: "", minClass: "", addClass: "", titleClass: "", lengthClass: ""},
  {1: "Squats", length: 1, type: "Session 2", forClick: ""},
  {2: "Freestyle", length: 2, type: "Session 3", forClick: ""},
  {3: "Break", length: 1, type: "Break", forClick: ""}
];
*/
// we may want to do something like {list.map( return component)}
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 1,
      seshLength: 1,
      seshLength2: 1,
      seshLength3: 2,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 60,
      intervalID: '',
      alarmColor: {color: 'white'}
    }
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.setSeshLength2 = this.setSeshLength2.bind(this);
    this.setSeshLength3 = this.setSeshLength3.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBrkLength(e) {
    this.lengthControl('brkLength', e.currentTarget.value, 
    this.state.brkLength, 'Break');
  }
  setSeshLength(e) {
    this.lengthControl('seshLength', e.currentTarget.value, 
    this.state.seshLength, 'Session');
  }
  setSeshLength2(e) {
    this.lengthControl('seshLength2', e.currentTarget.value, 
    this.state.seshLength2, 'Session 2');
  }
  setSeshLength3(e) {
    this.lengthControl('seshLength3', e.currentTarget.value, 
    this.state.seshLength3, 'Session 3');
  }
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState == 'running') return;
    if (this.state.timerType == timerType) {
      if (sign == "-" && currentLength != 1 ) {
        this.setState({[stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60});
      } else if (sign == "+" && currentLength != 60) {
        this.setState({[stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60});
      }        
    } else { // this is to actually change the face of time if the othertimerType is the same one we're changing. 
      if (sign == "-" && currentLength != 1 ) {
        this.setState({[stateToChange]: currentLength - 1});
      } else if (sign == "+" && currentLength != 60) {
        this.setState({[stateToChange]: currentLength + 1});
      }
    }
  }
  timerControl() {
    let control = this.state.timerState == 'stopped' ? (
      clearInterval(this.state.intervalID),
      this.beginCountDown(),
      this.setState({timerState: 'running'})
    ) : (
      clearInterval(this.state.intervalID),
      this.setState({timerState: 'stopped'})
    );
  }
  beginCountDown() {
    this.setState({
      intervalID: setInterval(() => {
        this.decrementTimer(); 
        this.phaseControl();
       }, 1000)
    })
  }
  decrementTimer() {
    this.setState({timer: this.state.timer - 1});
  }
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    
    if (timer < 0) { 
      if ( this.state.timerType == 'Session' ) {
        clearInterval(this.state.intervalID);
        (
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength2 * 60, 'Session 2')
      )} 
      else if (this.state.timerType == 'Session 2') {
        clearInterval(this.state.intervalID);
        (
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength3 * 60, 'Session 3')
      )}
      else if (this.state.timerType == 'Session 3') {
        clearInterval(this.state.intervalID);
        (
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Break')
      )}
      else {
        clearInterval(this.state.intervalID);
        (
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength * 60, 'Session')
      )};
    }
  }
  warning(_timer) {
    let warn = _timer < 61 ? 
    this.setState({alarmColor: {color: '#a50d0d'}}) : 
    this.setState({alarmColor: {color: 'white'}});
  }
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: {color: 'white'}
    })
  }
  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  reset() {
    this.setState({
      brkLength: 1,
      seshLength: 1,
      seshLength2: 1,
      seshLength3: 2,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 60,
      intervalID: '',
      alarmColor: {color: 'white'}
    });
    clearInterval(this.state.intervalID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div className="container grid">
          <TimerLengthControl
          titleID="session-label"   minID="session-decrement"
          addID="session-increment" lengthID="session-length"
          title="Session Length"    onClick={this.setSeshLength} 
          length={this.state.seshLength}/>      
          <TimerLengthControl 
            titleID="session-label"   minID="session-decrement"
            addID="session-increment" lengthID="session-length"
            title="Session 2 Length"    onClick={this.setSeshLength2} 
            length={this.state.seshLength2}/>
          <TimerLengthControl 
          titleID="session-label"   minID="session-decrement"
          addID="session-increment" lengthID="session-length"
          title="Session 3 Length"    onClick={this.setSeshLength3} 
          length={this.state.seshLength3}/>
          <TimerLengthControl
            titleID="break-label"   minID="break-decrement"
            addID="break-increment" lengthID="break-length"
            title="Break Length"    onClick={this.setBrkLength}
            length={this.state.brkLength}/>
        </div>
        
        <div className="timer" onClick={this.timerControl} style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id='timer-label'>
              {this.state.timerType}
            </div>
            <div id='time-left'>
              {this.clockify()}
            </div>
          </div>
        </div>
        <div className="timer-control">
          <button id="reset" onClick={this.reset} className="btn btn-danger">Reset</button>
        </div>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
};


module.exports = Timer;