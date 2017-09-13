if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.AgentController = (function (global){
    'use strict';
    var Log = require('log');
    var log = new Log('info');

    var DEBUG_LOG = "AgentController";

    var spawn = require('child_process').spawn;
    var config = require('../../config/config');

    var controller_mapping = {
        "superfluidity-nsd-openvim": "./superfluidity/nsd/openvim/deployment" ,
        "oshi-mininet": "./oshi/mininet/deployment"
    };

    function AgentController(args){

        log.info("[%s] %s", DEBUG_LOG, 'Constructor');
        this.log_actions = [];
        this.deployments = {};
        this.status = "Runnig";
    }

    AgentController.prototype.createDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'createDeployment');
        var self = this;
        if(this.deployments != undefined){
            console.log(JSON.stringify(args))
            console.log(args.deployment_type)
            console.log(controller_mapping[args.deployment_type]);
            var deployment = new (require(controller_mapping[args.deployment_type]))(args);
            this.deployments[args.deployment_id] = deployment;
            deployment.launch(
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
            fail("The agent is not capable to create a new deployment.")
        }


    };

    AgentController.prototype.stopDeployment = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'stopDeployment');
        var deployment = this.deployments[args.deployment_id];
        if(deployment){
            deployment.stop(success, fail);
            deployment = null;
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
        var deployment = this.deployments[args.deployment_id];
        if(deployment){
            deployment.getStatus(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };

    AgentController.prototype.getDeploymentInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getDeploymentInfo');
        var deployment = this.deployments[args.deployment_id];
        if(deployment){
            deployment.getInfo(args, success, fail);
        }
        else{
            fail('Deployment not found');
        }
    };


    AgentController.prototype.getNodeConsole = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');

        var deployment = this.deployments[args.deployment_id];
        if(deployment){
            deployment.getNodeConsole(args, success, fail);
        }
        else{
            return fail('Deployment not found.');
        }
    };

    AgentController.prototype.getNodeInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeInfo');
        var deployment = this.deployments[args.deployment_id];
        if(deployment){
            deployment.getNodeInfo(args, success, fail);
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
