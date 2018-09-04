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
      <div>
        {this.state.lengthControlList.map((item, ind) => {return <FormEntry index={ind} defInput={item.name} defSelect={item.length} onAddTimer={this.props.onAddTimer} onRemoveTimer={this.props.onRemoveTimer}/>})}
        <Link style={{display: 'block', height: '100%', width: '100%'}} to='/'>
          <button className="btn" onClick={this.props.onSubmit}>
            Submit
          </button>
        </Link>
      </div>
    )
  }
};

module.exports = Form;