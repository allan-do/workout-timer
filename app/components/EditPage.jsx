const React = require('react');
const Link = require('react-router-dom').Link;
const FormContainer = require('../containers/FormContainer');
const styles = require('../style.css');


/* the main page for the about route of this app */
class EditPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Set Timers</h1>
        <FormContainer />   
        
      </div>
    );
  }
}

module.exports = EditPage;