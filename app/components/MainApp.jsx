const React = require('react');
const Link = require('react-router-dom').Link

const Timer = require('./Timer');
const TimerContainer = require('../containers/TimerContainer');
const styles = require('../style.css');


/* the main page for the index route of this app */
const MainApp = function() {
  return (
    <div>
      <TimerContainer />
      <footer id="footer" class="text-center">
        <div class="container">
          Dedicated to the Bubs by the Bubs
        </div>
      </footer>
    </div>
  );
};


module.exports = MainApp;