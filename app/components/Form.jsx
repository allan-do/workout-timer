const React = require('react');
const FormEntry = require('./FormEntry');
const Link = require('react-router-dom').Link;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthControlList: this.props.lengthControlList
    }
  }
  render() {
    return (
      <div id="formEdit" className="text-center">
        <Link style={{display: 'block', height: '100%', width: '100%'}} to='/timer'>
          <button className="btn btn-info" onClick={this.props.onSubmit}>
            Submit
          </button>
        </Link>
        <div id="toggleTimers">
          <button id="btnAdd" className="btn btn-primary" onClick={this.props.onAddTimer}>
              Add Timer
          </button>
          <button id="btnRemove" className="btn btn-warning" onClick={this.props.onRemoveTimer}>
              Remove Timer
          </button>
        </div>
        <div id="testMe">
          {this.state.lengthControlList.map((item, ind) => {return <FormEntry index={ind} defInput={item.name} defSelect={item.length} onAddTimer={this.props.onAddTimer} onRemoveTimer={this.props.onRemoveTimer} onToggleTime={this.props.onToggleTime} lengthControlList={this.state.lengthControlList}/>})}
        </div>
      </div>
    )
  }
};

module.exports = Form;