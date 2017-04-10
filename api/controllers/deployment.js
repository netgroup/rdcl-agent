if (typeof dreamer === 'undefined') {
  var dreamer = {};
}

dreamer.DeploymentController = (function (global){
    'use strict';
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');

    function DeploymentController(args){

    }

    DeploymentController.prototype._initSh = function(){
        var self = this;
        this.sh.stdout.on('data', function(data){
            console.log(`stdout: ${data}`);
        });

        this.sh.stderr.on('data', function (data){
            console.log(`stderr: ${data}`);
        });

        this.sh.on('close', function(data){
            if (code !== 0) {
              console.log(`ps process exited with code ${code}`);
            }
        });

    };

    DeploymentController.prototype.start = function(){
        //var deploymentCMD ="sudo python mininet_deployer.py --topology "+self.tpath + " --nodeinfo " + self.tpath;
        this.sh = spawn("sudo python",['mininet_deployer.py' ], {
            //'PWD': '/home/user'
        });
        this._initSh();
    };

    DeploymentController.prototype.stop = function(){

    };

    DeploymentController.prototype.getInfo = function(){

    };





    return DeploymentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.DeploymentController;
}
