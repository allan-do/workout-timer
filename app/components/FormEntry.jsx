const React = require('react');


var gMinutesList = [];
for (let n = 1; n <= 60; n++) {
  gMinutesList.push(n);
}



/*Form Entry Selection Component */
class FormEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesList: gMinutesList,
      defInput: this.props.defInput,
      defSelect: this.props.defSelect
      
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.incrTimer = this.incrTimer.bind(this);
    this.decrTimer = this.decrTimer.bind(this);
  }

  handleNameChange(event) {
    this.setState({defInput: event.target.value});
  }
  handleTimeChange(event) {
    this.setState({defSelect: event.target.value});
  }
  incrTimer(event) {
    console.log('increase!');
  }
  decrTimer(event) {
    console.log('decrease!');
  }
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="timeEntry">
        <div className="form-group">
          <label for={"timeName"+this.props.index}>Timer Name:</label>
          <input type="text" value={this.state.defInput} className="form-control timeLabel" id={"timeName"+this.props.index} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label for={"timeSelect"+this.props.index}>Minute:</label>
          {/*<button id={'add'+this.props.index} className="btn" alt="upvote" onClick={this.props.onAddTimer}>&uarr;</button> */}
          <div>
            <button id={'add'+this.props.index} className="btn incrTime" alt="upvote" onClick={this.incrTimer}>&uarr;</button>
            <input type="text" className="form-control timeSelection" value={this.state.defSelect} id={"timeSelect"+this.props.index} onChange={this.handleTimeChange} />
            <button id={'rem'+this.props.index} className="btn decrTime" alt="downvote" onClick={this.decrTimer}>&darr;</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = FormEntry;