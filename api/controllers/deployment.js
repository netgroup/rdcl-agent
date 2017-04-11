if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.DeploymentController = (function (global){
    'use strict';
    var DEBUG_LOG = "[DeploymentController]";
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');
    var Helper = require('../../helpers/helper');
    /**
        Constructor
    */
    function DeploymentController(args){
        console.log("DeploymentController Constructor");
        console.log(JSON.stringify(args));
        this._id = args.deployment_id;
        this._topology_path = '/tmp/deployment_' + this._id + '.json';
        this._topology_deployment = args.topology;

        //this.start();
        this.console_output = [];
    }


    DeploymentController.prototype._initSh = function(success, error){
        console.log("DeploymentController _initSh");
            var self = this;
            this.sh.stderr.setEncoding('utf-8');
            this.sh.stdout.setEncoding('utf-8');
            this.sh.stdout.on('data', function(data){
                console.log("stdout:", data);
                self.console_output.push(data);
            });

            this.sh.stderr.on('data', function (data){
                console.log("stderr:", data);
                self.console_output.push(data);
            });

            this.sh.on('error', function(e){
                console.log("error:", e);
            });

            this.sh.on('close', function(code){
                if (code !== 0) {
                    var msg_exit = "MininetDeployment process exited with code: " + code;
                  console.log(msg_exit);
                  self.console_output.push(msg_exit);
                }
            });



    };

    DeploymentController.prototype.launch = function(succes, error){
        console.log("DeploymentController launch", this._topology_path);
        var self = this;
        var h = new Helper();
        h.newJSONfile(this._topology_path, this._topology_deployment,
        function(){
            self.sh = spawn("sudo",['python','mininet_deployer.py' , '--topology', self._topology_path, '--version', '2'], {
                'cwd': config.mininet.mininet_extension_path
            });
            self._initSh(succes, error);

        },function(e){
            error(e);
        });


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
