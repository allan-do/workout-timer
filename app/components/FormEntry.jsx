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
  }

  handleNameChange(event) {
    this.setState({defInput: event.target.value});
  }
  handleTimeChange(event) {
    this.setState({defSelect: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="timeEntry">
        <div class="form-group">
          <label for={"timeName"+this.props.index}>Timer Name:</label>
          <input type="text" value={this.state.defInput} className="form-control timeLabel" id={"timeName"+this.props.index} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label for={"timeSelect"+this.props.index}>Minute:</label>
          <input type="text" className="form-control timeSelection" value={this.state.defSelect} id={"timeSelect"+this.props.index} onChange={this.handleTimeChange} />
  
          <button id={'add'+this.props.index} alt="upvote" onClick={this.props.onAddTimer}>&uarr;</button>
          <button id={'rem'+this.props.index} alt="downvote" onClick={this.props.onRemoveTimer}>&darr;</button>
        </div>
      </div>
    );
  }
};

module.exports = FormEntry;