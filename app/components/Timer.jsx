const React = require('react');
const accurateInterval = require('accurate-interval');
const TimerLengthControl = require('./TimerLengthControl');
// alot of code/inspiration was from here: https://codepen.io/freeCodeCamp/pen/XpKrrW?editors=0010
const styles = require('../style.css');

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
      alarmColor: {color: 'black'}
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
    this.state.seshLength2, 'Session2');
  }
  setSeshLength3(e) {
    this.lengthControl('seshLength3', e.currentTarget.value, 
    this.state.seshLength3, 'Session3');
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
      
      //this.state.intervalID && this.state.intervalID.cancel()
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
        //this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength2 * 60, 'Session2')
      )} 
      else if (this.state.timerType == 'Session2') {
        clearInterval(this.state.intervalID);
        (
        //this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength3 * 60, 'Session3')
      )}
      else if (this.state.timerType == 'Session3') {
        clearInterval(this.state.intervalID);
        (
         //this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Break')
      )}
      else {
        clearInterval(this.state.intervalID);
        (
        //this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength * 60, 'Session')
      )};
    }
    /*
    if (timer < 0) { 
      this.state.timerType == 'Session' ? (
        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.brkLength * 60, 'Break')
      ) : (
        this.state.intervalID && this.state.intervalID.cancel(),
        this.beginCountDown(),
        this.switchTimer(this.state.seshLength * 60, 'Session')
      );
    } */
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
      timerType: str
      //alarmColor: {color: 'white'}
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
    //this.state.intervalID && this.state.intervalID.cancel();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div className="grid2x2">
          <TimerLengthControl
          titleID="session-label"   minID="session-decrement"
          addID="session-increment" lengthID="session-length"
          title="Session Length"    onClick={this.setSeshLength} 
          length={this.state.seshLength}/>      
          <TimerLengthControl 
            titleID="session-label"   minID="session-decrement"
            addID="session-increment" lengthID="session-length"
            title="Session Length2"    onClick={this.setSeshLength2} 
            length={this.state.seshLength2}/>
          <TimerLengthControl 
          titleID="session-label"   minID="session-decrement"
          addID="session-increment" lengthID="session-length"
          title="Session Length3"    onClick={this.setSeshLength3} 
          length={this.state.seshLength3}/>
          <TimerLengthControl
            titleID="break-label"   minID="break-decrement"
            addID="break-increment" lengthID="break-length"
            title="Break Length"    onClick={this.setBrkLength}
            length={this.state.brkLength}/>
        </div>
        <div className="timer" style={this.state.alarmColor}>
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
          <button id="start_stop" onClick={this.timerControl}>
            <i className="fa fa-play "/>
            <i className="fa fa-pause"/>
          </button>
          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh"/>
          </button>
        </div>
        <div className="author"> Designed and Coded by <br />
          <a target="_blank" href="https://goo.gl/6NNLMG"> 
            Peter Weinberg
          </a>
          <p>Modification by Allan Do</p>
        </div>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
};


module.exports = Timer;