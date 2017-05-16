if (typeof dreamer === 'undefined') {
  var dreamer = {};
}


dreamer.DeploymentController = (function (global){
    'use strict';
    var Log = require('log')
    var log = new Log('info');
    var DEBUG_LOG = "DeploymentController";
    var spawn = require('child_process').spawn;
    var execFile = require('child_process').execFile;
    var config = require('../../../../config/config');
    var Helper = require('../../../../helpers/helper');
    var ShellInABox = require('../../../../helpers/shellinabox');
    
    /**
        Constructor
    */
    function DeploymentController(args){
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController Constructor");
        this._id = args.deployment_id;
        this._topology_path = '/tmp/deployment_' + this._id + '.json';
        this._deployment_descriptor = args.deployment_descriptor;
        this._openvim = {
            'vm': ['vm-clickos-vlan', 'vm-clickos-ping', 'vm-clickos-firewall'],
            'net': ['net-vl1', 'net-vl2', 'net-vl3'],
            'image': ['clickos-vnf_click_vdu_ping', 'clickos-vnf_click_vdu_vlan', 'clickos-vnf_click_vdu_fwall']
        }


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
                var msg_exit = "OpenVimDeployment process exited with code: " + code;
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
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController launch ");
        var self = this;
        var fs = require('fs');
        for(var desc_type in this._deployment_descriptor){
            log.info("[%s] %s", DEBUG_LOG, desc_type)
            for(var filename in this._deployment_descriptor[desc_type]){
                var ext_file = (desc_type !== 'click')? 'json':'click';
                var fullfilename = config.openvim.BASE_CWD + "/" + filename + "."  + ext_file;
                log.info("[%s]  creating file %s.%s", DEBUG_LOG, filename, ext_file);
                var data = (desc_type !== 'click')?JSON.stringify(this._deployment_descriptor[desc_type][filename], null, 4) : this._deployment_descriptor[desc_type][filename];
                fs.writeFile(fullfilename, data);
             }
        }
        var h = new Helper();
        h.newJSONfile(this._topology_path, this._deployment_descriptor,
        function(){

            self.sh = spawn("bash",['openvimanagement.sh'], {
                'cwd': config.openvim.BASE_CWD,
                'env': {
                    'OPENVIM_HOST': config.openvim.OPENVIM_HOST,
                    'OPENVIM_PORT': config.openvim.OPENVIM_PORT,
                    'OPENVIM_ADMIN_PORT': config.openvim.OPENVIM_ADMIN_PORT,
                    'OPENVIM_TENANT': config.openvim.OPENVIM_TENANT,
                }
            });
            self._initSh(success, error);

        },function(e){
            error(e);
        });


    };

    DeploymentController.prototype.stop = function(success, error){
        var self = this;
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController stop");
        for(var elm_cat in this._openvim){

            this._openvim[elm_cat].forEach(function(element){
                var arg_del = elm_cat + '-delete';
                console.log(element);

                var delete_elem = execFile('./openvim', [arg_del, '-f', element],{
                    'cwd': config.openvim.OPENVIM_CLI_HOME,
                    'env': {
                        'OPENVIM_HOST': config.openvim.OPENVIM_HOST,
                        'OPENVIM_PORT': config.openvim.OPENVIM_PORT,
                        'OPENVIM_ADMIN_PORT': config.openvim.OPENVIM_ADMIN_PORT,
                        'OPENVIM_TENANT': config.openvim.OPENVIM_TENANT,
                    }
                }, function(err, stdout, stderr){
                    if (err) {
                        console.error(err);
                        return;
                    }
                      console.log(stdout);
                });
            });
        }
        //FIXME we have to decide an error criteria
        success && success();
    };

    DeploymentController.prototype.getInfo = function(args, success, fail){
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor
        };

        return success(info_data);
    };

    DeploymentController.prototype.getStatus = function(args, success, fail){
        log.info("[%s] %s",DEBUG_LOG,"getStatus");
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor,
        };

        return success(info_data);
    };

    DeploymentController.prototype.getNodeConsole = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');
        var result = {
            console_enabled: false,
            console_info: {
                'url': '',
                'type': 'shellinabox'
            }
        };

        return success(result);
    };


    return DeploymentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.DeploymentController;
}
