if (typeof dreamer === 'undefined') {
  var dreamer = {};
}

dreamer.ShellInABox = (function (global){
    'use strict';
  	var DEBUG_LOG = "[ShellInABox]";

  	function ShellInABox(){
  		console.log(DEBUG_LOG,"Constructor");
  	}


  	ShellInABox.prototype.start = function(data, success, error){


  	};

    ShellInABox.prototype.stop = function(data, success, error){


  	};

    ShellInABox.prototype.check = function(){


  	};


  return ShellInABox;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.ShellInABox;
}
