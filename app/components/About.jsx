const React = require('react');
const Link = require('react-router-dom').Link;
const VoteContainer = require('../containers/VoteContainer');
const FormEntry = require('./FormEntry');

const gSetList = [
  {index: 0, name: "Jump Rope", length: 1, type: "Session"},
  {index: 1, name: "Squats", length: 1, type: "Session 2"},
  {index: 2, name: "Freestyle", length: 2, type: "Session 3"},
  {index: 3, name: "Break", length: 1, type: "Break"}
];


/* the main page for the about route of this app */
class About extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      setList: gSetList
    }
  }
  render() {
    return (
      <div>
        <h1>About</h1>

        <p>This is a starter react app use react-redux to manage state - try rating this app below to see it in action!</p>

        <VoteContainer label="Upvote or downvote this app!"/>
        {this.state.setList.map((item) => {return <FormEntry />})}
        <Link to='/'>Go home</Link>
      </div>
    );
  }
}

module.exports = About;