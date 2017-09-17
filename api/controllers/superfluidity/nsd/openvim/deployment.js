if (typeof dreamer === 'undefined') {
    var dreamer = {};
}


dreamer.DeploymentController = (function (global) {
    'use strict';
    var Log = require('log')
    var log = new Log('debug');
    var fs = require('fs');
    var path = require("path");
    var sync = require('child_process').spawnSync;
    var YAML = require('yamljs');
    var DEBUG_LOG = "DeploymentController";
    var spawn = require('child_process').spawn;
    var execFile = require('child_process').execFile;
    var config = require('../../../../../config/config');
    var Helper = require('../../../../../helpers/helper');
    var ShellInABox = require('../../../../../helpers/shellinabox');


    // store the UUIDs in these arrays
    // vdu -> image UUID
    var UUID_images = {};
    // vdu -> net UUID
    var UUID_networks = {};

    var UUID_vms = {};

    // map VNF to VDU
    var VNF2VDU = {};

    // store the vdu hypervisors and flavors here
    // vdu -> hypervisor
    var VDUHYPERVISOR = {};
    // vdu -> flavor
    var VDUFLAVOR = {};

    // map virtualLinkProfileId to virtualLinkId
    var VLPID2VLID = {};

    // association between hypervisors and VM types
    var VMTYPES = {
        'xenhvm': "HVM",
        'xen-unik': "ClickOS"
    };

    // association between hypervisors and OS image types
    var IMAGETYPES = {
        'xenhvm': "clickos",
        'xen-unik': "clickos"
    };

    ////
    /**
     Constructor
     */
    function DeploymentController(args) {
        log.info("[%s] %s", DEBUG_LOG, "DeploymentController Constructor");
        this._id = args.deployment_id;

        this._deployment_descriptor = args.deployment_descriptor;
        this._cmd_result = {};
        this._deployment_path = path.join(process.env.PWD, 'deployments_data', 'superfluidity-nsd-openvim', 'deployment_' + this._id)
        this._yamlsdir = path.join(this._deployment_path, "yamls");

        this._deployment_data_file = path.join(this._deployment_path, 'deployment_' + this._id + '.json');

        //init directory if not exist (mkdir -p)
        var mkdirp = require('mkdirp');
        var self = this;
        mkdirp.sync(this._yamlsdir)

        this.shellinabox = new ShellInABox();
        this.shellinabox.isInstalled(function () {
            self.shellinabox.start({cmd: config.openvim.start_cmd}, function () {
                console.log("ShellInABox started.")
            });
        }, function () {
            console.log("ShellInABox not Installed.")
        });

        //this.start();
        this.console_output = [];
    }


    DeploymentController.prototype._createImageCLick = function (vduId) {
        //TODO add exception on command errors
        log.info("[%s] %s", DEBUG_LOG, "start creating Clickimage");
        var result;
        var image_file_name = 'clickos_' + vduId;
        var new_image_path = this._yamlsdir + '/' + image_file_name;
        var commands = [
            ['cp', config.openvim.STAMINALCLICKOSIMAGE, new_image_path],
            [config.openvim.CLICKINJECTOR, vduId + '.click', new_image_path],
            ['chmod', 'u+rw', new_image_path]
        ];
        for (var c in commands) {
            var command = commands[c][0];
            commands[c].shift();
            log.debug("[%s] Command: %s %s", DEBUG_LOG, command, commands[c]);
            var exec_res = sync(command, commands[c]);
            log.debug("[%s] exit with: %s ", DEBUG_LOG, exec_res.status);
        }

        result = new_image_path;
        return result;
    };

    DeploymentController.prototype._uploadImage = function (image_yaml_path) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "upload Image", image_yaml_path);
        var result = true;
        //scp -P${OPENVIMHOSTPORT} "${YAMLDIR}/clickos_${vduid}" ${OPENVIMHOSTUSERNAME}@${OPENVIMHOST}:/var/lib/libvirt/images/
        var args = ['-P' + config.openvim.OPENVIMHOSTPORT, image_yaml_path, config.openvim.OPENVIMHOSTUSERNAME + "@" + config.openvim.OPENVIMHOST + ":/var/lib/libvirt/images/"];
        log.debug("[%s] Command: %s %s", DEBUG_LOG, 'scp', args.toString());
        var exec_res = sync('scp', args);
        log.debug("[%s] exit with: %s", DEBUG_LOG, exec_res.status);
        return result;
    };

    DeploymentController.prototype._generateImageYaml = function (vduId) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "generateImageYaml", vduId);
        var result;
        var file_name = 'image-clickos-' + vduId + '.yaml';
        var file_path = this._yamlsdir + '/' + file_name;
        var yaml_template = "image:\n" +
            "    name:         clickos-" + vduId + "\n" +
            "    description:  click-os " + vduId + " image\n" +
            "    path:         /var/lib/libvirt/images/clickos_" + vduId + "\n" +
            "    metadata:     # Optional extra metadata of the image. All fields are optional\n" +
            "        use_incremental: \"no\"          # \"yes\" by default, \"no\" Deployed using a incremental qcow2 image\n";
        //FIXME ADD try catch
        fs.writeFileSync(file_path, yaml_template);
        result = file_path;
        return result;
    };

    DeploymentController.prototype._generateNetworkYaml = function (virtualLinkDescId) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "generateNetworkYaml", virtualLinkDescId);
        var result;
        var file_name = 'net-' + virtualLinkDescId + '.yaml';
        var file_path = this._yamlsdir + '/' + file_name;
        var yaml_template = "network:\n" +
            "    name:               net-" + virtualLinkDescId + "\n" +
            "    type:               bridge_data\n" +
            "    provider:           OVS:default\n" +
            "    enable_dhcp:        false\n" +
            "    shared:             false";

        fs.writeFileSync(file_path, yaml_template);
        result = file_path;
        return result;
    };

    DeploymentController.prototype._getRandomMacAddress = function () {
        var mac_random = "00:15:17:XX:XX:XX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
        });
        return mac_random;
    };

    DeploymentController.prototype._generateVMYaml = function (args) {
        log.info("[%s] %s %s", DEBUG_LOG, "generateVMYaml", JSON.stringify(args));
        var result;
        var vm_name = 'vm-' + args.vduhypervisor + '-' + args.vnfid;
        var file_name = vm_name + '.yaml';
        var file_path = path.join(this._yamlsdir, file_name);
        var yaml_template =
            "server:\n" +
            "  name: " + vm_name + "\n" +
            "  description: \"" + VMTYPES[args.vduhypervisor] + " VM\"\n" +
            "  imageRef: '" + args.uuidImage + "'\n" +
            "  flavorRef: '" + args.vduflavor + "'\n" +
            "  start:    \"yes\"\n" +
            "  hypervisor: \"" + args.vduhypervisor + "\"\n" +
            "  osImageType: \"" + IMAGETYPES[args.vduhypervisor] + "\"\n";
        if (Object.keys(args.netuuids).length > 0) {
            yaml_template += "  networks:\n";
            for (var k in args.netuuids) {
                var network =
                    "  - name: net-" + args.vdu_id + "_vif" + k + "\n" +
                    "    uuid: " + args.netuuids[k] + "\n" +
                    "    mac_address: " + this._getRandomMacAddress() + "\n";
                yaml_template += network;
            }
        }

        fs.writeFileSync(file_path, yaml_template);
        result = file_path;
        return result;

    };

    DeploymentController.prototype._executeOpenVimClientCommand = function (args) {
        log.info("[%s] %s ", DEBUG_LOG, "executeOpenVimClientCommand");
        log.debug("[%s] Command: %s %s", DEBUG_LOG, 'openvim', args.toString());
        var exec_res = sync(config.openvim.OPENVIM, args, {
            'env': {
                'OPENVIM_HOST': config.openvim.env.OPENVIM_HOST,
                'OPENVIM_PORT': config.openvim.env.OPENVIM_PORT,
                'OPENVIM_ADMIN_PORT': config.openvim.env.OPENVIM_ADMIN_PORT,
                'OPENVIM_TENANT': config.openvim.env.OPENVIM_TENANT,
            }
        });
        log.debug("[%s] exit with: %s ", DEBUG_LOG, exec_res.status);
        if (exec_res.status == 0) {
            return exec_res.stdout.toString()
        }
        return;
    };

    DeploymentController.prototype._onboardImage = function (image_yaml_path) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "onboardImage", image_yaml_path);
        var result;
        var args = ['image-create', image_yaml_path];
        var exec_res = this._executeOpenVimClientCommand(args);
        if (exec_res != undefined) {
            var output_split = exec_res.split(' ');
            result = (output_split[0] != "") ? output_split[0] : output_split[1];
            log.debug("[%s] UUID image: %s ", DEBUG_LOG, result);
        }
        return result;
    };

    DeploymentController.prototype._onboardNetwork = function (net_yaml_path) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "onboardNetwork", net_yaml_path);
        var result;
        var args = ['net-create', net_yaml_path];
        var exec_res = this._executeOpenVimClientCommand(args);
        if (exec_res != undefined) {
            var output_split = exec_res.split(' ');
            result = (output_split[0] != "") ? output_split[0] : output_split[1];
            log.debug("[%s] UUID network: %s ", DEBUG_LOG, result);
        }
        return result;
    };

    DeploymentController.prototype._onboardVm = function (vm_yaml_path) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "onboardVM", vm_yaml_path);
        var result;
        var args = ['vm-create', vm_yaml_path];
        var exec_res = this._executeOpenVimClientCommand(args);
        if (exec_res != undefined) {
            var output_split = exec_res.split(' ');
            result = (output_split[0] != "") ? output_split[0] : output_split[1];
            log.debug("[%s] UUID vm: %s ", DEBUG_LOG, result);
        }
        return result;
    };

    DeploymentController.prototype._getSwImageUUID = function (swImage) {
        //TODO add exception on command errors
        log.info("[%s] %s %s", DEBUG_LOG, "getSwImageUUID", swImage);
        var result;
        var args = ['image-list', swImage];
        var exec_res = this._executeOpenVimClientCommand(args);
        if (exec_res != undefined) {
            var output_split = exec_res.split(' ');
            result = (output_split[0] != "") ? output_split[0] : output_split[1];
            log.debug("[%s] UUID image: %s ", DEBUG_LOG, result);
        }
        return result;
    };

    DeploymentController.prototype._createOVSBridge = function (net_UUID) {
        log.info("[%s] %s %s", DEBUG_LOG, "createOVSBridge on", net_UUID);
        var result;
        var args = ['net-list', '-vvv', net_UUID];
        var exec_res = this._executeOpenVimClientCommand(args);
        if (exec_res != undefined) {
            var yaml_object = YAML.parse(exec_res.substring(exec_res.indexOf("\n") + 1));
            var vlanid = yaml_object['network']['provider:vlan'];//=  (output_split[0] != "") ? output_split[0] : output_split[1];
            log.debug("[%s] Vlan id: %s ", DEBUG_LOG, vlanid);
            if (vlanid) {
                var args_ssh = [config.openvim.OPENVIMHOSTUSERNAME + '@' + config.openvim.OPENVIMHOST, '-p', config.openvim.OPENVIMHOSTPORT, 'sudo', 'ovs-vsctl', '--may-exist', 'add-br', 'ovim-' + vlanid];
                log.debug("[%s] Command: ssh %s ", DEBUG_LOG, args_ssh.toString());
                var exec_res_ssh = sync('ssh', args_ssh);
                // TODO add exception
                result = true;
            }
        }

        return result;
    };


    DeploymentController.prototype._deploy = function (success, error) {
        var result = false;
        try {



            // 1. create and onboard the ClickOS images
            var vnfd_list = this._deployment_descriptor['vnfd'];
            for (var vnfid in vnfd_list) {
                var current_vnfd = vnfd_list[vnfid];
                var vdu_list = current_vnfd.vdu;
                for (var v in vdu_list) {
                    var vdu = vdu_list[v];
                    if (vdu.vduNestedDesc) {
                        var h = new Helper();
                        var nestedDesc = h.getNestedDesc(current_vnfd, vdu.vduNestedDesc);
                        if (nestedDesc.vduNestedDescriptorType == "click") {
                            //create a new image corresponding to the click configuration
                            var new_image_path = this._createImageCLick(vdu.vduId);
                            if (new_image_path != undefined) {

                                // upload image to the server. The way to do this is not defined by openvim, so we use scp
                                this._uploadImage(new_image_path);

                                // create the yaml for the image
                                var image_yaml_path = this._generateImageYaml(vdu.vduId);
                                // onboard the image and get its UUID
                                var image_UUID = this._onboardImage(image_yaml_path);
                                UUID_images[vdu.vduId] = image_UUID;
                                VDUHYPERVISOR[vdu.vduId] = "xen-unik";
                                VDUFLAVOR[vdu.vduId] = config.openvim.CLICKFLAVORUUID;
                            }

                        }
                    }
                    else {
                        // ASSUMPTION: we have a "normal" VDU, which corresponds to an HVM virtual machine
                        // find the image UUID corresponding to swImageDesc
                        var swImage = vdu.swImageDesc.swImage;
                        var swimageUUID = this._getSwImageUUID(swImage);
                        UUID_images[vdu.vduId] = swimageUUID;
                        VDUHYPERVISOR[vdu.vduId] = "xenhvm";
                        VDUFLAVOR[vdu.vduId] = config.openvim.VMFLAVOURUUID;
                    }
                    if (VNF2VDU[vnfid] == undefined)
                        VNF2VDU[vnfid] = []
                    VNF2VDU[vnfid].push(vdu.vduId)
                }
            }

            // 2. create the networks corresponding to the virtuallinks
            for (var v in this._deployment_descriptor.nsd['nsd']['virtualLinkDesc']) {
                var vld = this._deployment_descriptor.nsd['nsd']['virtualLinkDesc'][v];
                // create the yaml for the network corresponding to the virtuallink
                var net_yaml_path = this._generateNetworkYaml(vld.virtualLinkDescId);
                // onboard the network and get its UUID
                var net_UUID = this._onboardNetwork(net_yaml_path);
                UUID_networks[vld.virtualLinkDescId] = net_UUID;

                // openvim does not yet create the ovs bridge automatically, so here we create it manually
                this._createOVSBridge(net_UUID);
            }

            // 3. create the VNFs, using references to the created images and networks
            log.info("[%s] %s", DEBUG_LOG, "Create the VNFs, using references to the created images and networks");
            // prepare/reset the file which will contain the VM UUIDs
            //FIXME store vmuuids in a different way
            fs.openSync(path.join(this._yamlsdir, 'vmuuids.txt'), 'w');

            // find the mapping between each virtualLinkProfileId and virtualLinkDescId
            // ASSUMPTION: we have only one nsDf in the NSD
            // populate the VLPID2VLID array
            var nsDf = this._deployment_descriptor.nsd['nsd']['nsDf'][0];
            for (var p in nsDf.virtualLinkProfile) {
                var vlp = nsDf.virtualLinkProfile[p];
                VLPID2VLID[vlp.virtualLinkProfileId] = vlp.virtualLinkDescId;
            }

            for (vnfid in this._deployment_descriptor.vnfd) {
                var vnfd = this._deployment_descriptor.vnfd[vnfid];
                // ASSUMPTION only one VDU IN VNF
                var vdu_id = VNF2VDU[vnfid][0];
                var image_UUID = UUID_images[vdu_id];
                log.debug("[%s] Vnfd %s vdu %s  image UUID %s", DEBUG_LOG, vnfd, vdu_id, image_UUID);
                var NETUUIDS = {};
                // search for the connection points of this VNF in the nsd, and their associated virtualLinkProfileId, to find the UUIDs of the networks
                // ASSUMPTION: on a virtuallink there is at most one extCP per VNF (i.e. a VNF does not have two interfaces on the same network)
                for (p in nsDf.vnfProfile) {
                    var vnfProfile = nsDf.vnfProfile[p];
                    if (vnfProfile.vnfdId == vnfid) {
                        for (var n in vnfProfile.nsVirtualLinkConnectivity) {
                            var nsVirtualLinkConnectivity = vnfProfile.nsVirtualLinkConnectivity[n];
                            if (nsVirtualLinkConnectivity.virtualLinkProfileId != null && nsVirtualLinkConnectivity.virtualLinkProfileId != "") {

                                var cpdId = nsVirtualLinkConnectivity.cpdId[0];
                                var virtualLinkProfileId = nsVirtualLinkConnectivity.virtualLinkProfileId;
                                // virtualLinkProfileId -> virtualLinkDescId
                                var vlid = VLPID2VLID[virtualLinkProfileId];
                                // virtualLinkDescId -> openvim UUID
                                var netUUID = UUID_networks[vlid];

                                // now search for the corresponding internalIfRef
                                // cpdId -> intVirtualLinkDesc
                                log.debug("[%s] virtualLinkProfileId %s vlid %s  netUUID %s", DEBUG_LOG, virtualLinkProfileId, vlid, netUUID);

                                for (var i in vnfd.vnfExtCpd) {
                                    var vnfExtCpd = vnfd.vnfExtCpd[i];

                                    if (vnfExtCpd.cpdId == cpdId) {
                                        var intVirtualLinkDesc = vnfExtCpd.intVirtualLinkDesc;
                                        for (var u in vnfd.vdu) {
                                            var current_vdu = vnfd.vdu[u];
                                            var index_no_internalIfRef = 0;
                                            for (var d in current_vdu.intCpd) {
                                                var intCpd = current_vdu.intCpd[d];
                                                if (intCpd.intVirtualLinkDesc == intVirtualLinkDesc) {
                                                    if (intCpd.internalIfRef != undefined)
                                                        NETUUIDS[intCpd.internalIfRef] = netUUID;
                                                    else {
                                                        NETUUIDS[index_no_internalIfRef] = netUUID;
                                                        index_no_internalIfRef++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            //vnfid, uuidImage, vduhypervisor, vduflavor, vdu_id, NETUUIDS


                        }
                        var vm_yaml_path = this._generateVMYaml({
                            vnfid: vnfid,
                            uuidImage: UUID_images[vdu_id],
                            vduhypervisor: VDUHYPERVISOR[vdu_id],
                            vduflavor: VDUFLAVOR[vdu_id],
                            vdu_id: vdu_id,
                            netuuids: NETUUIDS
                        });
                        var vm_uuid = this._onboardVm(vm_yaml_path);
                        if (vm_uuid) {
                            console.log("vdu_id: " + vdu_id)
                            UUID_vms[vdu_id] =vm_uuid;
                        }
                        //TODO APPEND to vm_uuid list
                    }
                }
            }

        }
        catch (e) {
            return error(e);
        }
        return success();

    };

    DeploymentController.prototype.launch = function (success, error) {
        log.info("[%s] %s", DEBUG_LOG, "DeploymentController launch ");
        var self = this;

        var h = new Helper();
        h.newJSONfile(this._deployment_data_file, this._deployment_descriptor,
            function () {
                self._deploy(success, error);

            }, function (e) {
                error(e);
            });


    };

    DeploymentController.prototype.stop = function (success, error) {
        var self = this;
        log.info("[%s] %s", DEBUG_LOG, "DeploymentController stop");
        //FIXME without stop script
        execFile(config.openvim.CLEAN_UP_SCRIPT, {
            'cwd': config.openvim.BASE_CWD,
            'env': {
                'OPENVIM_HOST': config.openvim.OPENVIM_HOST,
                'OPENVIM_PORT': config.openvim.OPENVIM_PORT,
                'OPENVIM_ADMIN_PORT': config.openvim.OPENVIM_ADMIN_PORT,
                'OPENVIM_TENANT': config.openvim.OPENVIM_TENANT,
            }
        }, function (err, stdout, stderr) {
            if (err) {
                console.error(err);
                //error && error();
            }
            console.log(stdout);
        });


        //FIXME we have to decide an error criteria
        success && success();
    };

    DeploymentController.prototype.getInfo = function (args, success, fail) {
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor
        };

        return success(info_data);
    };

    DeploymentController.prototype.getStatus = function (args, success, fail) {
        log.info("[%s] %s", DEBUG_LOG, "getStatus");
        var info_data = {
            id: this._id,
            deployment_descriptor: this._deployment_descriptor,
            topology_deployment: this.buildTopologyDeployment()
        };

        return success(info_data);
    };

    DeploymentController.prototype.getNodeConsole = function (args, success, fail) {
        log.info("[%s] %s", DEBUG_LOG, 'getNodeConsole');
        var result = {
            console_enabled: false,
            console_info: {
                'url': '',
                'type': 'shellinabox'
            }
        };
        if (args['node_id']) {
            var shellinabox = new ShellInABox();
            args['nodeUUID'] = UUID_vms[args['node_id']];
            console.log(args['nodeUUID']);
            result.console_info.url = shellinabox.getNodeEndPoint(args);
            result.console_enabled = true;
        }
        console.log("getNodeConsole", JSON.stringify(args))
        return success(result);
    };

    DeploymentController.prototype.getNodeInfo = function (args, success, fail) {
        log.info("[%s] %s", DEBUG_LOG, 'getNodeInfo');
        var result = {};
        var self = this;
        self._cmd_result['node_info'] = {};
        if (args['node_id']) {

            var nodeUUID = UUID_vms[args['node_id']];
            var exec_res = this._executeOpenVimClientCommand(['vm-list', '-v', nodeUUID]);

            if (exec_res != undefined) {
                log.debug("[%s] Node info:\n %s ", DEBUG_LOG, exec_res);
                success(exec_res);
            }

        }
        else {
            return fail('Node id missing.');
        }

    };

    DeploymentController.prototype.buildTopologyDeployment = function (args) {

        var result = {
            "edges": [],
            "vertices": []
        };

        var args_vm = ['vm-list', '-vvv'];
        var exec_vm_result = this._executeOpenVimClientCommand(args_vm);

        if (exec_vm_result != undefined) {
            var vms_data = exec_vm_result.replace(/(^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})([\s]+)(.)+\nserver:)/mg, function (token) {
                var res = token.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/)
                if(res && res.length >0)
                    return res[0] + ":";
                return "Error";
            });

            var yaml_object = YAML.parse(vms_data);

            for(var uuid in yaml_object){
                var vertice = {
                    "info": {
                        "group": [],
                        "property": {
                            "custom_label": yaml_object[uuid]['name'],
                            "ovim_uuid": uuid,
                        },
                        "type": "vnf"

                    },
                    "id": uuid //
                };
                result.vertices.push(vertice);
            }

            var args_net = ['net-list', '-vvv'];
            var exec_net_result = this._executeOpenVimClientCommand(args_net);

            if (exec_vm_result != undefined) {
                var net_data = exec_net_result.replace(/(^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})([\s]+)(.)+\nnetwork:)/mg, function (token) {
                    var res = token.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/)
                    if(res && res.length >0)
                        return res[0] + ":";
                    return "Error";
                });

                var yaml_net_object = YAML.parse(net_data);
                for(var uuid_net in yaml_net_object){
                    var vertice = {
                        "info": {
                            "group": [],
                            "property": {
                                "custom_label": yaml_net_object[uuid_net]['name'],
                                "net_uuid": uuid_net,
                            },
                            "type": "ns_vl"

                        },
                        "id": uuid_net//
                    };
                    result.vertices.push(vertice);
                    for(var p in yaml_net_object[uuid_net].ports){
                        var edge ={
                            "source": uuid_net,
                            "group": [],
                            "target": yaml_net_object[uuid_net].ports[p].port_id,
                            "view": "ns"
                        };
                        result.edges.push(edge);
                        //console.log(edge);
                    }

                }
            }


        }

        console.log(result);

        return result;
    };


    return DeploymentController;

}(this));

if (typeof module === 'object') {
    module.exports = dreamer.DeploymentController;
}
