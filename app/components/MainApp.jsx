const React = require('react');
const Link = require('react-router-dom').Link

const About = require('./About');
const VoteContainer = require('../containers/VoteContainer');
const Timer = require('./Timer');
const styles = require('../style.css');


/* the main page for the index route of this app */
const MainApp = function() {
  return (
    <div>
      <Link to='/about'>Read about and Rate this app!</Link>
      <Timer />
      <footer id="footer" class="text-center">
        <div class="container">
          Dedicated to Danica Fernandez by Allan Do
        </div>
      </footer>
    </div>
  );
};


module.exports = MainApp;