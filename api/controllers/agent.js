if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.AgentController = (function (global){
    'use strict';
    var Log = require('log')
    var log = new Log('info');

    var DEBUG_LOG = "AgentControllerBase";
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');
    
    var shellInABoxController = require('../../helpers/shellinabox')();

    function AgentController(args){
        log.info("[%s] %s", 'Constructor');
        this.log_actions = [];
        this.deployments = {};
        this.status = "Runnig";
    }

    AgentController.prototype.createDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'createDeployment');
        var self = this;
        this.deployments = new DeploymentController(args);
        this.deployments.launch(
            function(){
                log.info("[%s] %s", DEBUG_LOG, 'createDeployment callback launch success');
                success();
            }, function(error){
                log.error("[%s] %s", DEBUG_LOG, 'createDeployment callback launch fail');
                fail(error);
            }
        );

    };

    AgentController.prototype.stopDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'stopDeployment');

        if(this.deployments){
            this.deployments.stop(success, fail)
            this.deployments = null;
        }
        else{
            fail('Deployment not found');
        }

    };

    AgentController.prototype.getStatus = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getStatus');
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
    AgentController.prototype.getDeploymentStatus = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getDeploymentStatus');
        if(this.deployments){
            this.deployments.getStatus(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };

    AgentController.prototype.getDeploymentInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getDeploymentInfo');
        if(this.deployments){
            this.deployments.getInfo(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };


    AgentController.prototype.getNodeConsole = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');

        if(this.deployments){
            this.deployments.getNodeConsole(args, success, fail);
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
