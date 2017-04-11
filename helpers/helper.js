if (typeof dreamer === 'undefined') {
  var dreamer = {};
}

dreamer.Helper = (function (global){
  'use strict';
  	var DEBUG_LOG = "[Helper]";

  	function Helper(){
  		console.log(DEBUG_LOG,"Builder");
  	}

    /* Write json data on a file .json */
  	Helper.prototype.newJSONfile= function(outputFilename, data, callback){
	  	var fs = require('fs');

	  	fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
	    	if(err) {
                if(callback)
	      		       callback({error: {message:err}});
	    	} else {
                if(callback)
	      		       callback({});
	    	}
		});

  	};

    /* Import json file */
  	Helper.prototype.impJsonFromFile = function(inputFilename, callback){
	  	var fs = require('fs');
	  	console.log(DEBUG_LOG,"impJsonFromFile", inputFilename);
	  	fs.readFile(inputFilename, 'utf8',function(err, data){
	  		if(err){
	  			console.log(DEBUG_LOG,"impJsonFromFile", "error");
	  			callback({error: {message:err}});
	  		}
	  		else{
	  			//console.log(data);
	  			var jsondata = JSON.parse(data);

	  			callback({data:jsondata});
	  		}
	  	});

  	};


  return Helper;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.Helper;
}
