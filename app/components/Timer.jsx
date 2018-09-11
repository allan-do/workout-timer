const React = require('react');
const accurateInterval = require('accurate-interval');
const TimerLengthControl = require('./TimerLengthControl');
// a lot of code/inspiration was from here: https://codepen.io/freeCodeCamp/pen/XpKrrW?editors=0010
const styles = require('../style.css');
// Attempt to put the length control on another page, it would append to this list which would then be mapped as a component later
const Link = require('react-router-dom').Link;

/* old timer 
div className="container grid">
          {this.state.timeList.map(function(item, i) {
            return <TimerLengthControl titleClass="session-label" lengthClass="session-length"
          title={"Session Length"} 
          specificTimer={item}
          onClick={this.setSeshLength.bind(this)}
          specificIndex={item["index"]}  
          length={item["length"]} />;
           }, this)}
        </div>
*/

//decrement timer still refers to timer. we may want to do something about this. we may want to just set state for current timer length as length every update
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: this.props.lengthControlList,
      currentTimer: this.props.lengthControlList[0],
      brkLength: 1,
      seshLength: 1,
      seshLength2: 1,
      seshLength3: 2,
      timerState: 'stopped',
      timer: this.props.lengthControlList[0]["length"]*60,
      intervalID: '',
      alarmColor: {color: 'white'}
    }
    this.setSeshLength = this.setSeshLength.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.fullReset = this.fullReset.bind(this);
    this.intervalReset = this.intervalReset.bind(this);
  }
  setSeshLength(e) {
    let sessionClicked = e.currentTarget.parentElement.id; 
    this.lengthControl('timeList', e.currentTarget.value, 
    this.state.currentTimer, 'Session',sessionClicked);
  }
  //need to revise the current situation that timer is being set BACK t othe old method of using seslength

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
    //fix this
    let timeNow = this.state.timer;
    this.setState({timer: timeNow - 1});
  }
  phaseControl() {
    let timer = this.state.timer;
    let currentInd = this.state.currentTimer["index"];
    this.warning(timer);
    this.buzzer(timer);
    
    if (timer < 0) { 
      if (currentInd == this.props.lengthControlList.length-1) {
        clearInterval(this.state.intervalID);
        this.setState({currentTimer: this.props.lengthControlList[0]});
        (
          this.beginCountDown(),
          this.switchTimer(this.state.currentTimer["length"] * 60)
        )
      } 
      else {
        clearInterval(this.state.intervalID);
        this.setState({currentTimer: this.props.lengthControlList[currentInd+1]});
        (
          this.beginCountDown(),
          this.switchTimer(this.state.currentTimer["length"] * 60)
        )
      };
    };
  }
  warning(_timer) {
    let warn = _timer < 61 ? 
    this.setState({alarmColor: {color: 'white'}}) : 
    this.setState({alarmColor: {color: 'white'}});
  }
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.volume = .3;
      this.audioBeep.play();
    }
  }
  switchTimer(num) {
    this.setState({
      timer: num,
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
  fullReset() {
    this.setState({
      currentTimer: this.props.lengthControlList[0],
      timerState: 'stopped',
      timer: 60 * this.props.lengthControlList[0].length,
      intervalID: '',
      alarmColor: {color: 'white'}
    });
    clearInterval(this.state.intervalID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  intervalReset() {
    this.setState({
      timerState: 'stopped',
      timer: 60 * this.state.currentTimer.length,
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
        <div className="timer" onClick={this.timerControl} style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id='timer-label'>
              {this.state.currentTimer["name"]}
            </div>
            <div id='time-left'>
              {this.clockify()}
            </div>
          </div>
        </div>
        <div className="timer-control">
          <div style={{display: 'block', height: '100%', width: '100%', margin: "0px 0px 10px 0px"}} >
            <button id="fullReset" onClick={this.fullReset} className="btn btn-danger">Full Reset</button>
          </div>
          <div style={{display: 'block', height: '100%', width: '100%'}}>
          <button id="intervalReset" onClick={this.intervalReset} className="btn btn-light">Interval Reset</button>
          </div>
          <Link style={{display: 'block', height: '100%', width: '100%'}} to='/'>
            <button id="btnEdit" className="btn btn-info">
              Edit Timers
            </button>
          </Link>
        </div>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
};

//old timer Length control

module.exports = Timer;