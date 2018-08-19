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
      minutesList: gMinutesList
    }
  }
  render() {
    return (
      <div>
        <div class="form-group">
          <label for="sel1">Select list:</label>
          <select class="form-control" id="sel1">
            {this.state.minutesList.map(function(item,i) {return <option>{item}</option>;})}
          </select>
        </div>
      </div>
    );
  }
};

module.exports = FormEntry;