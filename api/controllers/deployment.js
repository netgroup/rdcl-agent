if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.DeploymentController = (function (global){
    'use strict';
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');

    /**
        Constructor
    */
    function DeploymentController(args){

        console.log("DeploymentController Constructor");
        this.start()
        this.console_output = [];
    }


    DeploymentController.prototype._initSh = function(){
        console.log("DeploymentController _initSh");
        var self = this;
        this.sh.stderr.setEncoding('utf-8');
        this.sh.stdout.setEncoding('utf-8');
        this.sh.stdout.on('data', function(data){
            console.log("stdout:", data);
            self.console_output.push(data)
        });

        this.sh.stderr.on('data', function (data){
            console.log("stderr:", data);
            self.console_output.push(data)
        });

        this.sh.on('close', function(code){
            if (code !== 0) {
                var msg_exit = "MininetDeployment process exited with code: " + code;
              console.log(msg_exit);
              self.console_output.pushyou(msg_exit)
            }
        });

    };

    DeploymentController.prototype.start = function(){
        console.log("DeploymentController start");
        //var deploymentCMD ="sudo python mininet_deployer.py --topology "+self.tpath + " --nodeinfo " + self.tpath;
        this.sh = spawn("sudo",['python','mininet_deployer.py' , '--topology', 'topo/version2.json', '--version', '2'], {
            'cwd': config.mininet.mininet_extension_path
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
