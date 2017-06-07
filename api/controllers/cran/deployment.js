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
    var config = require('../../../config/config');
    var Helper = require('../../../helpers/helper');
    var ShellInABox = require('../../../helpers/shellinabox');

    /**
        Constructor
    */
    function DeploymentController(args){
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController Constructor");
        this._id = args.deployment_id;
        this._topology_path = '/tmp/deployment_' + this._id + '.json';
        this._deployment_descriptor = args.deployment_descriptor;
        console.log(this._deployment_descriptor)
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
                var msg_exit = "CRANDeployment process exited with code: " + code;
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

            var ext_file = 'yaml';
            var filename = 'deployment_' + this._id;
        var YAML = require('json2yaml')
                try {
                    
                    var fullfilename = config.cran.BASE_CWD + "/" + filename + "."  + ext_file;
                    log.info("[%s]  creating file %s.%s", DEBUG_LOG, filename, ext_file);
                    fs.writeFileSync(fullfilename, YAML.stringify(this._deployment_descriptor));
                } catch (e) {
                    log.info("[%s] error creating local descriptor file %s",DEBUG_LOG ,e)
                    if (error) {
                        return error("error starting deployment");
                    }
                }


        // EDIT HERE to execute deployment
        /*
        self.sh = spawn("bash",['crandeploy.sh'], {
            'cwd': config.cran.BASE_CWD,
            'env': {
                
            }
        });
        self._initSh(success, error);
        */

    };

    DeploymentController.prototype.stop = function(success, error){
        var self = this;
        log.info("[%s] %s",DEBUG_LOG,"DeploymentController stop");
        // EDIT HERE TO STOP DEPLOYMENT
        /*
        execFile(config.cran.CLEAN_UP_SCRIPT, {
            'cwd': config.cran.BASE_CWD,
            'env': {
            }
        },function(err, stdout, stderr){
            if (err) {
                console.error(err);
                //error && error();
            }
            console.log(stdout);
        });
        */
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
            topology_deployment: this.buildTopologyDeployment()
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
        if(args['node_id']){
            var shellinabox = new ShellInABox();
            args['nodeUUID'] = args['node_id'];
            result.console_info.url = shellinabox.getNodeEndPoint(args);
            result.console_enabled = true;
        }
        console.log("getNodeConsole",JSON.stringify(args))
        return success(result);
    };

    DeploymentController.prototype.buildTopologyDeployment = function(args){
        var result = {
            "edges": [],
            "vertices": []
        };
        return result;
    };


    return DeploymentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.DeploymentController;
}
