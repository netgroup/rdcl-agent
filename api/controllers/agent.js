if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.AgentController = (function (global){
    'use strict';
    var DEBUG_LOG = "[AgentController]";
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');
    var DeploymentController = require('../controllers/deployment');
    var shellInABoxController = require('../../helpers/shellinabox')();

    function AgentController(args){
        console.log(DEBUG_LOG, 'Constructor');
        this.log_actions = [];
        this.deployment = null;
        this.status = "Runnig";
    }

    AgentController.prototype.createDeployment = function(args, success, fail){
        console.log(DEBUG_LOG, 'createDeployment');
        var self = this;
        this.deployment = new DeploymentController(args);
        this.deployment.launch(
            function(){
                console.log(DEBUG_LOG, 'createDeployment callback launch success');
                success();
            }, function(error){
                console.log(DEBUG_LOG, 'createDeployment callback launch fail');
                fail(error);
            }
        );

    };

    AgentController.prototype.stopDeployment = function(args, success, fail){
        console.log(DEBUG_LOG, 'stopDeployment');

        if(this.deployment){
            this.deployment.stop()
        }
        this.deployment = null;
    };

    AgentController.prototype.getStatus = function(args, success, fail){
        console.log(DEBUG_LOG, 'getStatus');
        var status = {
            status: this.status,
            deployment: {

            },
            shellinabox:{
                endpoint: "",
                port: "",
                status: ""
            }
        };

        return status;
    };

    AgentController.prototype.getNodeConsole = function(args, success, fail){
        console.log(DEBUG_LOG, 'getNodeConsole');

        if(this.deployment){
            this.deployment.getNodeConsole(args, success, fail);
        }
        else{
            return fail('Deployment not found.');
        }
    };




    return AgentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.AgentController;
}
