/* container which maps state and dispatches to its props 
  so it can be referenced in the VoteButtons component */

const { connect } = require('react-redux');
const actions = require('../actions');
const Timer = require('../components/Timer');
const React = require('react');
const Link = require('react-router-dom').Link

var lengthControlList = [
  {index: 0, name: "Jump rope", length: 1, type: "Session"},
  {index: 1, name: "Squats", length: 1, type: "Session 2"},
  {index: 2, name: "Freestyle", length: 2, type: "Session 3"},
  {index: 3, name: "Break", length: 1, type: "Break"}
];

const mapStateToProps = function(state) {
  if (state.lengthControlList == null) {
    state.lengthControlList = lengthControlList;
  }
  
  if (state.testTimeList == null) {
    state.testTimeList = lengthControlList;
  }
  return {
    voteScore: state.voteScore,
    voteCount: state.voteCount,
    lengthControlList: state.lengthControlList,
    testTimeList: state.testTimeList
  }
}


//add in the redux functions from reducers here.
const mapDispatchToProps = function(dispatch) {
  return {
    onAddTimer: function() {
      dispatch(actions.addtimer())
    },
    onRemoveTimer: function() {
      dispatch(actions.removetimer())
    },
    onSubmit: function() {
      dispatch(actions.submit())
    },
    onToggleTime: function() {
      dispatch(actions.toggletime())
    },
    onIncTime: function() {
      dispatch(actions.inctime())
    },
    onDecTime: function() {
      dispatch(actions.dectime())
    }
    
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);



module.exports = TimerContainer;

