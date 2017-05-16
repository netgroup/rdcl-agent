if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.DeploymentController = (function (global){
    'use strict';
    var Log = require('log')
    var log = new Log('info');
    var DEBUG_LOG = "DeploymentController";
    var spawn = require('child_process').spawn;
    var config = require('../../config/config');
    var Helper = require('../../helpers/helper');
    var ShellInABox = require('../../helpers/shellinabox');
    /**
        Constructor
    */
    function DeploymentController(args){
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController Constructor");
        this._id = args.deployment_id;
        this._topology_path = '/tmp/deployment_' + this._id + '.json';
        this._deployment_descriptor = args.deployment_descriptor;

        //this.start();
        this.console_output = [];
    }


    DeploymentController.prototype._initSh = function(success, error){
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController _initSh");
            var self = this;
            this.sh.stderr.setEncoding('utf-8');
            this.sh.stdout.setEncoding('utf-8');
            this.sh.stdout.on('data', function(data){
                log.info("[%s] %s",DEBUG_LOG,"stdout:", data);
                self.console_output.push(data);
            });

            this.sh.stderr.on('data', function (data){
                log.info("[%s] %s",DEBUG_LOG,"stderr:", data);
                self.console_output.push(data);
            });

            this.sh.on('error', function(e){
                log.info("[%s] %s",DEBUG_LOG,"error:", e);
                error(e);
            });

            this.sh.on('close', function(code){
                var msg_exit = "MininetDeployment process exited with code: " + code;
                log.info("[%s] %s",DEBUG_LOG,msg_exit);
                self.console_output.push(msg_exit);
                if (code !== 0) {
                    error(msg_exit);
                }
                else{
                    success();
                }
            });



    };

    DeploymentController.prototype.launch = function(success, error){
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController launch " + this._topology_path);
        var self = this;
        var h = new Helper();
        h.newJSONfile(this._topology_path, this._deployment_descriptor,
        function(){
            self.sh = spawn("sudo",['python','mininet_deployer.py' , '--topology', self._topology_path, '--version', '2'], {
                'cwd': config.mininet.mininet_extension_path
            });
            self._initSh(success, error);

        },function(e){
            error(e);
        });


    };

    DeploymentController.prototype.stop = function(success, error){
        var self = this;
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController stop");
        var stsh = spawn("sudo",['python','mininet_deployer.py' , '--stop-all'], {
                'cwd': config.mininet.mininet_extension_path
            });
            stsh.on('error', function(e){
                log.info("[%s] %s",DEBUG_LOG,"error: " + e);
                error(e);
            });

            stsh.on('close', function(code){

                var msg_exit = "MininetDeployment process clean exited with code: " + code;
                log.info("[%s] %s",DEBUG_LOG,msg_exit);
                self.console_output.push(msg_exit);
                if (code !== 0) {
                    error(msg_exit);
                }
                else{
                    success();
                }
            });


    };

    DeploymentController.prototype.getInfo = function(args, success, fail){
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor
        };

        return success(info_data);
    };

    DeploymentController.prototype.getStatus = function(args, success, fail){
        log.info("[%s] %s",DEBUG_LOG,"getStatus")
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor
        };

        return success(info_data);
    };

    DeploymentController.prototype.getNodeConsole = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');
        var helper = new Helper();
        helper.impJsonFromFile('/tmp/overall_info.json', function(data_result){
            if(data_result.error){
                return fail(data_result.error.message)
            }
            else{
                var node_data = data_result.data[args.node_id] || undefined;
                var shellinabox = new ShellInABox();
                var result = {
                        console_enabled: false,
                        console_info: {
                            'url': '',
                            'type': 'shellinabox'
                        }
                    }
                if(node_data && node_data['mgt_IP']){

                    args['mgt_IP'] = node_data['mgt_IP'];
                    result.console_info.url = shellinabox.getNodeEndPoint(args);
                    result.console_enabled = true;
                }
                return success(result);

            }

        });



    };





    return DeploymentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.DeploymentController;
}
