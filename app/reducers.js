/* reducers, this defines what functions are actually done in redux*/

const { LENGTHCONTROLLIST, ADDTIMER, REMOVETIMER, SUBMIT } = require('./actions');

function votes(state = [], action) {
  switch (action.type) {      
    case ADDTIMER:
      //do not make a copy of the state or else it won't real tiem update
      var nextTimer = {index: state.lengthControlList.length, name: "Placeholder", length: 1, type: "Session"}
      state.lengthControlList.push(nextTimer)
      return Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore + 1 : 1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1,
        lengthControlList: state.lengthControlList    
      });
    case REMOVETIMER:
      if (state.lengthControlList.length == 1) {
        return state;
      }
      state.lengthControlList.pop();
      return Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore - 1 : -1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1,
        lengthControlList: state.lengthControlList    
      });
    case SUBMIT:
      var submitList = []
      var sessionName = document.getElementsByClassName('timeLabel');
      var sessionTime = document.getElementsByClassName('timeSelection');
      for (var i=0; i<sessionName.length; i++){
        submitList.push({index: i, name: sessionName[i].value, length: parseInt(sessionTime[i].value), type: "Session " + (i+1)});
      }
      state.lengthControlList = submitList;
      return Object.assign({}, state, {
        voteScore: ( state.voteScore ) ? state.voteScore - 1 : -1,
        voteCount: ( state.voteCount ) ? state.voteCount + 1 : 1,
        lengthControlList: state.lengthControlList    
      });
    default:
      return state;
  }
}

module.exports = votes