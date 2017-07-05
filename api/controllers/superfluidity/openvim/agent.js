if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.AgentController = (function (global){
    'use strict';
    var Log = require('log')
    var log = new Log('info');

    var DEBUG_LOG = "AgentController";
    var spawn = require('child_process').spawn;
    var config = require('../../../../config/config');
    var DeploymentController = require('./deployment');
    var shellInABoxController = require('../../../../helpers/shellinabox')();

    function AgentController(args){
        log.info("[%s] %s", DEBUG_LOG, 'Constructor');
        this.log_actions = [];
        this.deployment = null;
        this.status = "Runnig";
    }

    AgentController.prototype.createDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'createDeployment');
        var self = this;
        if(this.deployment =! undefined){
            this.deployment = new DeploymentController(args);
            this.deployment.launch(
                function(){
                    log.info("[%s] %s", DEBUG_LOG, 'createDeployment callback launch success');
                    success();
                }, function(error){
                    log.error("[%s] %s", DEBUG_LOG, 'createDeployment callback launch fail');
                    fail(error);
                }
            );
        }
        else{
            fail("Agent busy with another deployment.")
        }


    };

    AgentController.prototype.stopDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'stopDeployment');

        if(this.deployment){
            this.deployment.stop(success, fail)
            this.deployment = null;
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
        if(this.deployment){
            this.deployment.getStatus(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };

    AgentController.prototype.getDeploymentInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getDeploymentInfo');
        if(this.deployment){
            this.deployment.getInfo(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };


    AgentController.prototype.getNodeConsole = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');

        if(this.deployment){
            this.deployment.getNodeConsole(args, success, fail);
        }
        else{
            return fail('Deployment not found.');
        }
    };

    AgentController.prototype.getNodeInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeInfo');

        if(this.deployment){
            this.deployment.getNodeInfo(args, success, fail);
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
