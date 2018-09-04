const React = require('react');

class Clock extends React.Component{
  render() {
    return (
      <ul>
        <div className="length-control">
        <div id={this.props.titleClass} className="timerLenConText">
          {this.props.title}
        </div>
        <button id={this.props.minID}
          className="btn-level" value="-" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-down fa-2x"/>
        </button>
        <div id={this.props.lengthID} className="btn-level timerLenConText">
          {this.props.length}
        </div>
        <button id={this.props.addID}
          className="btn-level" value="+" 
          onClick={this.props.onClick}>
          <i className="fa fa-arrow-up fa-2x"/>
        </button>
      </div>
        {this.props.items.map(function(item, i) {
          return (
            <div>
              <li key={i}>{item}</li>
              <li key={i}>{item}</li>
            </div>
          );
        })}
      </ul>
    );
  }
}

module.exports = Clock;