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

                try {
                    var ext_file = (desc_type !== 'click')? 'json':'click';
                    var fullfilename = config.openvim.BASE_CWD + "/" + filename + "."  + ext_file;
                    log.info("[%s]  creating file %s.%s", DEBUG_LOG, filename, ext_file);
                    var data = (desc_type !== 'click')?JSON.stringify(this._deployment_descriptor[desc_type][filename], null, 4) : this._deployment_descriptor[desc_type][filename];
                    fs.writeFileSync(fullfilename, data);
                } catch (e) {
                    log.info("[%s] error creating local descriptor file %s",DEBUG_LOG ,e)
                    if (error) {
                        return error("error starting deployment");
                    }
                }

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

        execFile(config.openvim.CLEAN_UP_SCRIPT, {
            'cwd': config.openvim.BASE_CWD,
            'env': {
                'OPENVIM_HOST': config.openvim.OPENVIM_HOST,
                'OPENVIM_PORT': config.openvim.OPENVIM_PORT,
                'OPENVIM_ADMIN_PORT': config.openvim.OPENVIM_ADMIN_PORT,
                'OPENVIM_TENANT': config.openvim.OPENVIM_TENANT,
            }
        },function(err, stdout, stderr){
            if (err) {
                console.error(err);
                //error && error();
            }
            console.log(stdout);
        });


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

    DeploymentController.prototype.getNodeInfo = function(args, success, fail){
        log.info("[%s] %s", DEBUG_LOG, 'getNodeInfo');
        var result = {
            
        };
        if(args['node_id']){
            var filename = config.openvim.BASE_CWD + '/yamls/vmuuids.txt'
            var lines = require('fs').readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
            console.log(lines)
            for( var l in lines){
                var current = lines[l];
                if(current.indexOf(args['node_id']) == 0){
                    var uuid = current.split(' : ')[1]
                    console.log("UUID", uuid)

                    var sh = spawn("./openvim",['vm-list', '-v', uuid], {
                        'cwd': config.openvim.OPENVIM_CLI_HOME,
                        'env': {
                            'OPENVIM_HOST': config.openvim.OPENVIM_HOST,
                            'OPENVIM_PORT': config.openvim.OPENVIM_PORT,
                            'OPENVIM_ADMIN_PORT': config.openvim.OPENVIM_ADMIN_PORT,
                            'OPENVIM_TENANT': config.openvim.OPENVIM_TENANT,
                        }
                    });

                    sh.stderr.setEncoding('utf-8');
                    sh.stdout.setEncoding('utf-8');
                    sh.stdout.on('data', function(data){
                        log.info("[%s] %s",DEBUG_LOG,"stdout:", data);
                        
                    });

                    sh.stderr.on('data', function (data){
                        log.info("[%s] %s",DEBUG_LOG,"stderr:", data);
                        
                    });

                    sh.on('error', function(e){
                        log.info("[%s] %s",DEBUG_LOG,"error:", e);
                        fail(e);
                    });

                    sh.on('close', function(code){
                        var msg_exit = "openvimcli vm info process exited with code: " + code;
                        log.info("[%s] %s",DEBUG_LOG,msg_exit);
                        
                        if (code !== 0) {
                            fail(msg_exit);
                        }
                        else{
                            success();
                        }
                    });

                }
            }
        }
        //console.log("getNodeConsole",JSON.stringify(args))
        //return success(result);
    };

    DeploymentController.prototype.buildTopologyDeployment = function(args){
        var result = {
            "edges": [
        		{
        			"source": "testvm",
        			"group": [],
        			"target": "vl3",
        			"view": "ns"
        		},
                {
        			"source": "vlan",
        			"group": [],
        			"target": "vl3",
        			"view": "ns"
        		},
                {
        			"source": "vlan",
        			"group": [],
        			"target": "vl1",
        			"view": "ns"
        		},
                {
        			"source": "firewall",
        			"group": [],
        			"target": "vl1",
        			"view": "ns"
        		},
                {
        			"source": "firewall",
        			"group": [],
        			"target": "vl2",
        			"view": "ns"
        		},
                {
        			"source": "ping",
        			"group": [],
        			"target": "vl2",
        			"view": "ns"
        		}
        	],
            "vertices": [
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "vnf"
        			},
        			"id": "testvm"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "vnf"
        			},
        			"id": "vlan"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "vnf"
        			},
        			"id": "firewall"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "vnf"
        			},
        			"id": "ping"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "ns_vl"
        			},
        			"id": "vl3"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "ns_vl"
        			},
        			"id": "vl2"
        		},
                {
        			"info": {
        				"group": [],
        				"property": {
        					"custom_label": "",

        				},
        				"type": "ns_vl"
        			},
        			"id": "vl1"
        		}
            ]
        };
        return result;
    };


    return DeploymentController;

}(this));

if (typeof module === 'object') {
  module.exports = dreamer.DeploymentController;
}
