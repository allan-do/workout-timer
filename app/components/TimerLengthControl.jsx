const React = require('react');

class TimerLengthControl extends React.Component {
  render() {
    return (
      <div id={this.props.specificIndex} className="length-control">
        <div id={this.props.titleClass} className="timerLenConText">
          {this.props.title}
        </div>
        <button
          className="btn btn-level" value="-" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-down fa-2x"/>
        </button>
        <div id={this.props.lengthClass} className="timerLenConText">
          {this.props.length}
        </div>
        <button
          className="btn btn-level" value="+" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-up fa-2x"/>
        </button>
      </div>
    )
  }
};

module.exports = TimerLengthControl;