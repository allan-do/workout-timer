const React = require('react');
const Link = require('react-router-dom').Link
const UnorderedList = require('./UnorderedList');
const About = require('./About');
const VoteContainer = require('../containers/VoteContainer');
const Timer = require('./Timer');
const styles = require('../style.css');


//1 Set's time for each workout in minutes. To be looped through 3 times.
const timeSet = [1,1,2,1];

/* the main page for the index route of this app */
const HelloWorld = function() {
  return (
    <div>
      <h1>Hello World!</h1>

      <Link to='/about'>Read about and Rate this app!</Link>

      
      <VoteContainer label="Upvote or downvote this app!"/>
      <Timer />
    </div>
  );
};

module.exports = HelloWorld;