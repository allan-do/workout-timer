const React = require('react');

class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID} className="timerLenConText">
          {this.props.title}
        </div>
        <button id={this.props.minID}
          className="btn btn-level" value="-" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-down fa-2x"/>
        </button>
        <div id={this.props.lengthID} className="timerLenConText">
          {this.props.length}
        </div>
        <button id={this.props.addID}
          className="btn btn-level" value="+" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-up fa-2x"/>
        </button>
      </div>
    )
  }
};

module.exports = TimerLengthControl;