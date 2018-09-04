const React = require('react');
const Link = require('react-router-dom').Link;
//onst VoteContainer = require('../containers/VoteContainer');
//const FormEntry = require('./FormEntry');
const FormContainer = require('../containers/FormContainer');
const styles = require('../style.css');


/* the main page for the about route of this app */
class About extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Set Timers</h1>
        <FormContainer />      
      </div>
    );
  }
}

module.exports = About;