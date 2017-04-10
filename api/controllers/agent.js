if (typeof dreamer === 'undefined') {
  var dreamer = {};
}




dreamer.AgentController = (function (global){
    'use strict';
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');



    return AgentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.AgentController;
}
