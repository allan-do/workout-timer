const React = require('react');
const accurateInterval = require('accurate-interval');
const TimerLengthControl = require('./TimerLengthControl');
// a lot of code/inspiration was from here: https://codepen.io/freeCodeCamp/pen/XpKrrW?editors=0010
const styles = require('../style.css');

// Attempt to put the length control on another page, it would append to this list which would then be mapped as a component later
var lengthControlList = [
  {index: 0, name: "Jump Rope", length: 1, type: "Session"},
  {index: 1, name: "Squats", length: 1, type: "Session 2"},
  {index: 2, name: "Freestyle", length: 2, type: "Session 3"},
  {index: 3, name: "Break", length: 1, type: "Break"}
];

//decrement timer still refers to timer. we may want to do something about this. we may want to just set state for current timer length as length every update
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: lengthControlList,
      currentTimer: lengthControlList[0],
      brkLength: 1,
      seshLength: 1,
      seshLength2: 1,
      seshLength3: 2,
      timerState: 'stopped',
      timer: lengthControlList[0]["length"]*60,
      intervalID: '',
      alarmColor: {color: 'white'}
    }
    this.setSeshLength = this.setSeshLength.bind(this);
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
  setSeshLength(e) {
    let sessionClicked = e.currentTarget.parentElement.id; 
    this.lengthControl('timeList', e.currentTarget.value, 
    this.state.currentTimer, 'Session',sessionClicked);
  }
  //need to revise the current situation that timer is being set BACK t othe old method of using seslength
  lengthControl(stateToChange, sign, currentTimer, timerType, sessionClicked) {
    if (this.state.timerState == 'running') return;
    if (this.state.currentTimer["index"] == sessionClicked) {
      if (sign == "-" && currentTimer["length"] != 1 ) {
        lengthControlList[sessionClicked]["length"] -= 1;
        this.setState({timeList: lengthControlList,
                       currentTimer: this.state.timeList[sessionClicked],
                       timer: this.state.currentTimer["length"]*60
                      });
      } else if (sign == "+" && currentTimer["length"] != 60) {
        lengthControlList[sessionClicked]["length"] += 1;
        this.setState({timeList: lengthControlList,
                       currentTimer: this.state.timeList[sessionClicked],
                       timer: this.state.currentTimer["length"]*60
                      });}        
    } else { // this is to actually change the face of time if the othertimerType is the same one we're changing. 
      if (sign == "-" && currentTimer != 1 ) {
        lengthControlList[sessionClicked]["length"] -= 1;
        this.setState({[stateToChange]: lengthControlList});
      } else if (sign == "+" && currentTimer != 60) {
        lengthControlList[sessionClicked]["length"] += 1;
        this.setState({[stateToChange]: lengthControlList});
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
    //fix this
    let timeNow = this.state.timer;
    this.setState({timer: timeNow - 1});
  }
  phaseControl() {
    //fix this
    let timer = this.state.timer;
    let currentInd = this.state.currentTimer["index"];
    this.warning(timer);
    this.buzzer(timer);
    
    if (timer < 0) { 
      if (currentInd == lengthControlList.length-1) {
        clearInterval(this.state.intervalID);
        this.setState({currentTimer: lengthControlList[0]});
        (
          this.beginCountDown(),
          this.switchTimer(this.state.currentTimer["length"] * 60)
        )
      } 
      else {
        clearInterval(this.state.intervalID);
        this.setState({currentTimer: lengthControlList[currentInd+1]});
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
  reset() {
    this.setState({
      currentTimer: lengthControlList[0],
      timerState: 'stopped',
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
          {this.state.timeList.map(function(item, i) {
            return <TimerLengthControl titleClass="session-label" lengthClass="session-length"
          title={"Session Length"} 
          specificTimer={item}
          onClick={this.setSeshLength.bind(this)}
          specificIndex={item["index"]}  
          length={item["length"]} />;
           }, this)}
        </div>
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