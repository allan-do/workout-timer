/* actions */

module.exports = {

  ADDTIMER: 'ADDTIMER',
  
  REMOVETIMER: 'REMOVETIMER',
  
  LENGTHCONTROLLIST: 'LENGTHCONTROLLIST',
  
  SUBMIT: 'SUBMIT',
  
  TOGGLETIME: 'TOGGLETIME',
  
  INCTIME: 'INCTIME',
  
  DECTIME: 'DECTIME',

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
  },
  
  toggletime: function () {
    return {
      type: this.TOGGLETIME
    }
  },
  
  inctime: function() {
    return {
      type: this.INCTIME
    }
  },
  
  dectime: function() {
    return {
      type: this.DECTIME
    }
  }
  
}
