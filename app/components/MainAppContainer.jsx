/* container which maps state and dispatches to its props 
  so it can be referenced in the VoteButtons component */

const { connect } = require('react-redux');
const actions = require('../actions');
const MainApp = require('../MainApp');

const VoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);

module.exports = VoteContainer;