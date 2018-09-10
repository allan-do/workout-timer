const React = require('react');


/*Form Entry Selection Component */
class FormEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defInput: this.props.defInput,
      defSelect: this.props.defSelect
      
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTime = this.toggleTime.bind(this);
  }
  toggleTime(event) {
    this.props.onToggleTime(event);
    this.setState({defSelect: this.props.lengthControlList[this.props.index].length});
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
        <div className="form-group">
          <label for={"timeName"+this.props.index}>Timer Name:</label>
          <input type="text" value={this.state.defInput} className="form-control timeLabel" id={"timeName"+this.props.index} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label for={"timeSelect"+this.props.index}>Minute:</label>
          {/*<button id={'add'+this.props.index} className="btn" alt="upvote" onClick={this.props.onAddTimer}>&uarr;</button> */}
          <div>
            <button id={'inc'+this.props.index} className="btn incrTime" alt="upvote" onClick={this.toggleTime}>&uarr;</button>
            <input type="text" className="form-control timeSelection" value={this.state.defSelect} id={"timeSelect"+this.props.index} onChange={this.handleTimeChange} />
            <button id={'dec'+this.props.index} className="btn decrTime" alt="downvote" onClick={this.toggleTime}>&darr;</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = FormEntry;