/* actions */

module.exports = {

  ADDTIMER: 'ADDTIMER',
  
  REMOVETIMER: 'REMOVETIMER',
  
  LENGTHCONTROLLIST: 'LENGTHCONTROLLIST',
  
  SUBMIT: 'SUBMIT',

  addtimer: function() {
    return {
      type: this.ADDTIMER
    }
  },
  
  removetimer: function() {
    return {
      type: this.REMOVETIMER
    }
  },
  
  lengthcontrollist: function() {
    return {
      type: this.LENGTHCONTROLLIST
    }
  },
  
  submit: function() {
    return {
      type: this.SUBMIT
    }
  }
  
}
