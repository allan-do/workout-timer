const React = require('react');
const Link = require('react-router-dom').Link
const UnorderedList = require('./UnorderedList');
const About = require('./About');
const VoteContainer = require('../containers/VoteContainer');
const Timer = require('./Timer');
const styles = require('../style.css');


/* the main page for the index route of this app */
const MainApp = function() {
  return (
    <div>
      <Timer />
      <footer id="footer" class="text-center">
        <div class="container">
          Dedicated to Danica Fernandez by Allan Do
        </div>
      </footer>
    </div>
  );
};


//with redux stuff below

/*
const HelloWorld = function() {
  return (
    <div>
      <UnorderedList items={timeSet} />
      <Link to='/about'>Read about and Rate this app!</Link>   
      <VoteContainer label="Upvote or downvote this app!"/>
      <Timer />
    </div>
  );
};

*/

module.exports = MainApp;