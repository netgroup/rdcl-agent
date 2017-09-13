
var nsd_root_file = "nsd.json";

var fs = require('fs');
var sync = require('child_process').spawnSync;
var YAML = require('yamljs');


/// GET ALL FROM CONFIG FILE
// flavor for ClickOS VMs
var CLICKFLAVORUUID = "5a258552-0a51-11e7-a086-0cc47a7794be";
// flavor for "normal" VMs
var VMFLAVOURUUID="40f7908a-3bb0-11e7-ad8f-0cc47a7794be";

var OPENVIM="/home/rfb/openvimclient/openvim";
var CLICKINJECTOR="/home/rfb/configinjector/configinjector";
var STAMINALCLICKOSIMAGE="/home/rfb/configinjector/clickos_x86_64_staminal";
var OPENVIMHOST="127.0.0.1";
var OPENVIMHOSTPORT="2222";
var OPENVIMHOSTUSERNAME="root";
var OPENVIMENV="/home/rfb/openvimclient/openvimconfig.sh";
//directory to store yamls
var YAMLDIR="yamls";

// store the UUIDs in these arrays
var UUID_images = {};
var UUID_networks = {};

// map VNF to VDU
var VNF2VDU = {};

// store the vdu hypervisors and flavors here
var VDUHYPERVISOR = {};
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
var deployment_data = {
    'deployment_id': 1,
    'project_type': 'superfluidity',
    'deployment_type': 'superfluidity-nsd-openvim',
    'deployment_descriptor': {
        'nsd': {
            'nsd': {
                "nsdInvariantId": "NSExampleInvariant",
                "virtualLinkDesc": [
                    {
                        "testAccess": [
                            "STRING"
                        ],
                        "description": "descrizione",
                        "virtuaLinkDescVersion": "0.1",
                        "virtualLinkDescProvider": "netgroup",
                        "connectivityType": {
                            "layerProtocol": "E-LAN",
                            "flowPattern": "line"
                        },
                        "security": {
                            "certificate": "certificate",
                            "algorithm": "algorithm",
                            "signature": "signature"
                        },
                        "virtualLinkDescId": "vl1",
                        "virtualLinkDf": [
                            {
                                "serviceAvaibilityLevel": "Level 1",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "flavourId": "flavourId"
                            }
                        ]
                    },
                    {
                        "testAccess": [
                            "STRING"
                        ],
                        "description": "descrizione",
                        "virtuaLinkDescVersion": "0.1",
                        "virtualLinkDescProvider": "netgroup",
                        "connectivityType": {
                            "layerProtocol": "E-LAN",
                            "flowPattern": "line"
                        },
                        "security": {
                            "certificate": "certificate",
                            "algorithm": "algorithm",
                            "signature": "signature"
                        },
                        "virtualLinkDescId": "vl2",
                        "virtualLinkDf": [
                            {
                                "serviceAvaibilityLevel": "Level 1",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "flavourId": "flavourId"
                            }
                        ]
                    },
                    {
                        "testAccess": [
                            "STRING"
                        ],
                        "description": "descrizione",
                        "virtuaLinkDescVersion": "0.1",
                        "virtualLinkDescProvider": "netgroup",
                        "connectivityType": {
                            "layerProtocol": "E-LAN",
                            "flowPattern": "line"
                        },
                        "security": {
                            "certificate": "certificate",
                            "algorithm": "algorithm",
                            "signature": "signature"
                        },
                        "virtualLinkDescId": "vl3",
                        "virtualLinkDf": [
                            {
                                "serviceAvaibilityLevel": "Level 1",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "flavourId": "flavourId"
                            }
                        ]
                    }
                ],
                "designer": "netgroup",
                "sapd": [
                    {
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "sap1",
                        "sapAddressAssignment": true,
                        "nsVirtualLinkDescId": "vl3"
                    }
                ],
                "nsdIdentifier": "nsd",
                "version": "1.0",
                "vnffgd": [],
                "nsDf": [
                    {
                        "flavourKey": "stringkey",
                        "vnfProfile": [
                            {
                                "instantiationLevel": "instantiationLevel",
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "minNumberOfInstances": 1,
                                "flavourId": "Reference to VnfDf",
                                "maxNumberOfInstances": 3,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "affinityOrAntiAffinity": "Enum",
                                        "scope": "Enum"
                                    }
                                ],
                                "vnfProfileId": "vnfProfileId",
                                "vnfdId": "vlan",
                                "nsVirtualLinkConnectivity": [
                                    {
                                        "virtualLinkProfileId": null,
                                        "cpdId": []
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl1",
                                        "cpdId": [
                                            "vnf_ext_cp_vlan2"
                                        ]
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl3",
                                        "cpdId": [
                                            "vnf_ext_cp_vlan"
                                        ]
                                    }
                                ]
                            },
                            {
                                "instantiationLevel": "instantiationLevel",
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "minNumberOfInstances": 1,
                                "flavourId": "Reference to VnfDf",
                                "maxNumberOfInstances": 3,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "affinityOrAntiAffinity": "Enum",
                                        "scope": "Enum"
                                    }
                                ],
                                "vnfProfileId": "vnfProfileId",
                                "vnfdId": "firewall",
                                "nsVirtualLinkConnectivity": [
                                    {
                                        "virtualLinkProfileId": null,
                                        "cpdId": []
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl1",
                                        "cpdId": [
                                            "vnf_ext_cp_firewall"
                                        ]
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl2",
                                        "cpdId": [
                                            "vnf_ext_cp_firewall2"
                                        ]
                                    }
                                ]
                            },
                            {
                                "instantiationLevel": "instantiationLevel",
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "minNumberOfInstances": 1,
                                "flavourId": "Reference to VnfDf",
                                "maxNumberOfInstances": 3,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "affinityOrAntiAffinity": "Enum",
                                        "scope": "Enum"
                                    }
                                ],
                                "vnfProfileId": "vnfProfileId",
                                "vnfdId": "ping",
                                "nsVirtualLinkConnectivity": [
                                    {
                                        "virtualLinkProfileId": null,
                                        "cpdId": []
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl2",
                                        "cpdId": [
                                            "vnf_ext_cp_ping"
                                        ]
                                    }
                                ]
                            },
                            {
                                "instantiationLevel": "instantiationLevel",
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "minNumberOfInstances": 1,
                                "flavourId": "Reference to VnfDf",
                                "maxNumberOfInstances": 3,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "affinityOrAntiAffinity": "Enum",
                                        "scope": "Enum"
                                    }
                                ],
                                "vnfProfileId": "vnfProfileId",
                                "vnfdId": "testvm",
                                "nsVirtualLinkConnectivity": [
                                    {
                                        "virtualLinkProfileId": null,
                                        "cpdId": []
                                    },
                                    {
                                        "virtualLinkProfileId": "virtualLinkProfileIdvl3",
                                        "cpdId": [
                                            "vnf_ext_cp_testvm"
                                        ]
                                    }
                                ]
                            }
                        ],
                        "nsDfId": "nsDf1",
                        "virtualLinkProfile": [
                            {
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "flavourId": "flavourId",
                                "localAffinityOrAntiAffinityRule": [],
                                "maxBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "minBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "virtualLinkProfileId": "virtualLinkProfileIdvl1",
                                "virtualLinkDescId": "vl1"
                            },
                            {
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "flavourId": "flavourId",
                                "localAffinityOrAntiAffinityRule": [],
                                "maxBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "minBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "virtualLinkProfileId": "virtualLinkProfileIdvl2",
                                "virtualLinkDescId": "vl2"
                            },
                            {
                                "affinityOrAntiAffinityGroupId": [
                                    {
                                        "scope": "Enum",
                                        "groupId": "groupId",
                                        "affinityOrAntiAffiinty": "Enum"
                                    }
                                ],
                                "flavourId": "flavourId",
                                "localAffinityOrAntiAffinityRule": [],
                                "maxBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "minBitrateRequirements": {
                                    "root": "throughput of link",
                                    "leaf": "throughput of link"
                                },
                                "virtualLinkProfileId": "virtualLinkProfileIdvl3",
                                "virtualLinkDescId": "vl3"
                            }
                        ]
                    }
                ],
                "vnfdId": [
                    "vlan",
                    "firewall",
                    "ping",
                    "testvm"
                ],
                "nsdName": "NS"
            }
        },
        'click': {
            'vnf_click_vdu_vlan': '\nsource0 :: FromDevice(0);\nsink0   :: ToDevice(1);\nsource1 :: FromDevice(1);\nsink1   :: ToDevice(0);\n\n// VLANDecapsulator :: StripEtherVLANHeader(-1);\n// VLANEncapsulator :: VLANEncap(100);\nVLANDecapsulator ::VLANDecap()\nVLANEncapsulator ::VLANEncap(100)\n\n//source0 -> VLANDecapsulator -> EnsureEther() -> sink0;\nsource0 -> VLANDecapsulator -> sink0;\nsource1 -> VLANEncapsulator -> sink1;\n\n',
            'vnf_click_vdu_ping': 'define($IP 10.10.0.3);\ndefine($MAC 00:15:17:15:5d:75);\n\nsource :: FromDevice(0);\nsink   :: ToDevice(0);\n// classifies packets\nc :: Classifier(\n    12/0806 20/0001, // ARP Requests goes to output 0\n    12/0806 20/0002, // ARP Replies to output 1\n    12/0800, // ICMP Requests to output 2\n    -); // without a match to output 3\n\narpq :: ARPQuerier($IP, $MAC);\narpr :: ARPResponder($IP $MAC);\n\nsource -> Print -> c;\nc[0] -> ARPPrint -> arpr -> sink;\nc[1] -> [1]arpq;\nIdle -> [0]arpq;\narpq -> ARPPrint -> sink;\nc[2] -> CheckIPHeader(14) -> ICMPPingResponder() -> EtherMirror() -> sink;\nc[3] -> Discard;\n\n',
            'vnf_click_vdu_fwall': '\nsource0 :: FromDevice(0);\nsink0   :: ToDevice(1);\nsource1 :: FromDevice(1);\nsink1   :: ToDevice(0);\n\nc :: Classifier(\n    12/0806, // ARP goes to output 0\n    12/0800 15/cc, // IP to output 1, only if QoS == 0xcc\n    -); // without a match to output 2\n\n// ipf :: IPFilter(allow icmp && len > 300,\n//                 drop all);\n\n//ipf :: IPFilter(allow ip tos 0,\n//                drop all);\n\nsource0 -> c;\nc[0] -> sink0;\n// c[1] -> CheckIPHeader -> ipf -> sink0;\nc[1] -> sink0;\nc[2] -> Print -> Discard;\n\nsource1 -> Null -> sink1;\n\n'
        },
        'vnfd': {
            'firewall': {
                "vnfSoftwareVersion": "0.1",
                "autoScale": [
                    "script"
                ],
                "elementGroup": [
                    {
                        "virtualLinkDesc": [],
                        "vdu": [],
                        "description": "description",
                        "vnfdElementGroupId": "groupId"
                    }
                ],
                "configurableProperties": {
                    "scaleVnfToLevelOpConfig": "",
                    "scaleVnfOpConfig": "",
                    "instantiateVnfOpConfig": ""
                },
                "vdu": [
                    {
                        "intCpd": [
                            {
                                "cpRole": "root or leaf",
                                "description": "description",
                                "layerProtocol": "E-LAN",
                                "internalIfRef": "0",
                                "cpdId": "vnf_vdu_cp_ouut",
                                "intVirtualLinkDesc": "vnf_vl2"
                            },
                            {
                                "cpRole": "root or leaf",
                                "description": "description",
                                "layerProtocol": "E-LAN",
                                "internalIfRef": "1",
                                "cpdId": "vnf_vdu_cp_ouut2",
                                "intVirtualLinkDesc": "vnf_vl22"
                            }
                        ],
                        "configurableProperties": {
                            "additionalVnfcConfigurableProperty": []
                        },
                        "virtualComputeDesc": "id",
                        "vduParent": "",
                        "bootOrder": [],
                        "description": "",
                        "virtualStorageDesc": "id",
                        "vduParentMandatory": "",
                        "swImageDesc": {
                            "swImage": "Reference to a SwImage",
                            "diskFormat": "Fat32",
                            "name": "Name",
                            "checksum": "checksum",
                            "supportedVirtualisationEnvironment": [
                                ""
                            ],
                            "minDisk": 500,
                            "id": "id",
                            "version": "0.1",
                            "minRam": 1,
                            "containerFormat": "containerFormat",
                            "operatingSystem": "operatingSystem",
                            "size": 300
                        },
                        "vduNestedDesc": "firewall",
                        "vduId": "vnf_click_vdu_fwall",
                        "vduParentBareMetal": "",
                        "nfviConstraint": [
                            ""
                        ],
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "name": ""
                    }
                ],
                "modifiableAttributes": {
                    "extension": [],
                    "metadata": []
                },
                "deploymentFlavour": [
                    {
                        "vduProfile": [
                            {
                                "maxNumberOfInstances": 5,
                                "minNumberOfInstances": 1,
                                "vduId": "vduId",
                                "affinityOrAntiAffinityGroupId": [
                                    "affinityOrAntiAffinityGroupId"
                                ],
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "virtualLinkProfile": [
                            {
                                "vnfVirtualLinkDescId": null,
                                "flavourId": "flavourId",
                                "affinityOrAntiAffinityGroupId": "affinityOrAntiAffinityGroupId",
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "defaultInstantiationLevelId": "defaultInstantiationLevelId",
                        "instantiationLevel": [
                            {
                                "vduLevel": [
                                    {
                                        "numberOfInstances": 5,
                                        "vduId": "vduId"
                                    }
                                ],
                                "description": "",
                                "levelId": "",
                                "scaleInfo": {
                                    "scaleLevel": 1,
                                    "aspectId": "aspectId"
                                }
                            }
                        ],
                        "supportedOperation": [
                            "eum"
                        ],
                        "flavourId": "flavourId",
                        "affinityOrAntiAffinityGroup": [
                            {
                                "scope": "Enum",
                                "type": "Enum",
                                "groupId": "groupId"
                            }
                        ],
                        "scalingAspect": [
                            {
                                "associatedGroup": "reference to VnfdElementGroup",
                                "maxScaleLevel": 10,
                                "id": "id",
                                "name": "name",
                                "description": "description"
                            }
                        ],
                        "vnfLcmOperationsConfiguration": {
                            "healVnfOpConfig": {
                                "parameter": [
                                    ""
                                ],
                                "cause": [
                                    ""
                                ]
                            },
                            "terminateVnfOpConfig": {
                                "maxRecommendedGracefulTerminationtimeout": 5,
                                "minGracefulTerminationTimeout": 1
                            },
                            "operateVnfOpConfig": {
                                "minGracefulStopTimeout": 1,
                                "maxRecommendedGracefulStopTimeout": 5
                            },
                            "instantiateVnfOpConfig": {
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfOpConfig": {
                                "scalingByMoreThanOneStepSupported": true,
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfToLevelOpConfig": {
                                "parameter": [
                                    ""
                                ],
                                "arbitraryTargetLevelsSupported": true
                            }
                        },
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "description": "description"
                    }
                ],
                "vnfProvider": "netgroup",
                "vnfmInfo": [
                    "VNFM compatible"
                ],
                "vnfProductName": "vnf1",
                "vnfdId": "firewall",
                "virtualStorageDesc": [
                    {
                        "rdmaEnabled": false,
                        "sizeOfStorage": 100,
                        "typeOfStorage": "volume",
                        "id": "id",
                        "swImageDesc": "reference SwImageDesc"
                    }
                ],
                "vduNestedDesc": [
                    {
                        "name": "",
                        "vduNestedDescriptor": "vnf_click_vdu_fwall",
                        "checksum": "",
                        "version": "",
                        "vduNestedDescriptorType": "click",
                        "id": "firewall"
                    }
                ],
                "vnfdVersion": "0.1",
                "intVirtualLinkDesc": [
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "bitrateRequirements": {
                                    "root": 7,
                                    "leaf": 13
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "monitoringParameter": {
                                    "performanceMetric": "performanceMetric",
                                    "id": "id",
                                    "name": "name"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "vnf_vl2"
                    },
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "bitrateRequirements": {
                                    "root": 7,
                                    "leaf": 13
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "monitoringParameter": {
                                    "performanceMetric": "performanceMetric",
                                    "id": "id",
                                    "name": "name"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "vnf_vl22"
                    }
                ],
                "lifeCycleManagementScript": [
                    {
                        "event": [
                            ""
                        ],
                        "script": ""
                    }
                ],
                "vnfExtCpd": [
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_firewall",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "vnf_vl2"
                    },
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_firewall2",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "vnf_vl22"
                    }
                ],
                "vnfIndicator": [
                    {
                        "source": "Enum",
                        "indicatorValue": [
                            ""
                        ],
                        "id": "id",
                        "name": "name"
                    }
                ],
                "virtualComputeDesc": [
                    {
                        "virtualMemory": {
                            "virtualMemOversubscriptionPolicy": "",
                            "virtualMemSize": 1,
                            "numaEnabled": false
                        },
                        "virtualCpu": {
                            "cpuArchitecture": "x86",
                            "numVirtualCpu": 2,
                            "virtualCpuOversubscriptionPolicy": "",
                            "virtualCpuClock": 2.6,
                            "virtualCpuPinning": {
                                "cpuPinningMap": "",
                                "cpuPinningPolicy": "Enum"
                            }
                        },
                        "virtualComputeDescId": "virtualComputeDescId",
                        "requestAdditionalCapabilities": [
                            {
                                "minRequestedAdditionalCapabilityVersion": "",
                                "preferredRequestedAdditionalCapabilityVersion": "",
                                "targetPerformanceParameters": [],
                                "requestedAdditionalCapabilityName": "",
                                "supportMandatory": true
                            }
                        ]
                    }
                ]
            },
            'vlan': {
                "vnfSoftwareVersion": "0.1",
                "lifeCycleManagementScript": [
                    {
                        "event": [
                            ""
                        ],
                        "script": ""
                    }
                ],
                "autoScale": [
                    "script"
                ],
                "elementGroup": [
                    {
                        "virtualLinkDesc": [],
                        "vdu": [],
                        "description": "description",
                        "vnfdElementGroupId": "groupId"
                    }
                ],
                "configurableProperties": {
                    "instantiateVnfOpConfig": "",
                    "scaleVnfOpConfig": "",
                    "scaleVnfToLevelOpConfig": ""
                },
                "virtualStorageDesc": [
                    {
                        "rdmaEnabled": false,
                        "sizeOfStorage": 100,
                        "typeOfStorage": "volume",
                        "id": "id",
                        "swImageDesc": "reference SwImageDesc"
                    }
                ],
                "deploymentFlavour": [
                    {
                        "vduProfile": [
                            {
                                "affinityOrAntiAffinityGroupId": [
                                    "affinityOrAntiAffinityGroupId"
                                ],
                                "minNumberOfInstances": 1,
                                "vduId": "vdu11",
                                "maxNumberOfInstances": 5,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "virtualLinkProfile": [
                            {
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ],
                                "flavourId": "flavourId",
                                "affinityOrAntiAffinityGroupId": "affinityOrAntiAffinityGroupId",
                                "vnfVirtualLinkDescId": null
                            }
                        ],
                        "defaultInstantiationLevelId": "defaultInstantiationLevelId",
                        "instantiationLevel": [
                            {
                                "scaleInfo": {
                                    "scaleLevel": 1,
                                    "aspectId": "aspectId"
                                },
                                "description": "",
                                "levelId": "",
                                "vduLevel": [
                                    {
                                        "numberOfInstances": 5,
                                        "vduId": "vduId"
                                    }
                                ]
                            }
                        ],
                        "supportedOperation": [
                            "eum"
                        ],
                        "flavourId": "flavourId",
                        "affinityOrAntiAffinityGroup": [
                            {
                                "scope": "Enum",
                                "type": "Enum",
                                "groupId": "groupId"
                            }
                        ],
                        "scalingAspect": [
                            {
                                "associatedGroup": "reference to VnfdElementGroup",
                                "id": "id",
                                "maxScaleLevel": 10,
                                "description": "description",
                                "name": "name"
                            }
                        ],
                        "vnfLcmOperationsConfiguration": {
                            "healVnfOpConfig": {
                                "cause": [
                                    ""
                                ],
                                "parameter": [
                                    ""
                                ]
                            },
                            "terminateVnfOpConfig": {
                                "maxRecommendedGracefulTerminationtimeout": 5,
                                "minGracefulTerminationTimeout": 1
                            },
                            "operateVnfOpConfig": {
                                "minGracefulStopTimeout": 1,
                                "maxRecommendedGracefulStopTimeout": 5
                            },
                            "scaleVnfOpConfig": {
                                "scalingByMoreThanOneStepSupported": true,
                                "parameter": [
                                    ""
                                ]
                            },
                            "instantiateVnfOpConfig": {
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfToLevelOpConfig": {
                                "arbitraryTargetLevelsSupported": true,
                                "parameter": [
                                    ""
                                ]
                            }
                        },
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "description": "description"
                    }
                ],
                "vnfProvider": "netgroup",
                "vnfmInfo": [
                    "VNFM compatible"
                ],
                "vnfProductName": "vnf1",
                "vnfdId": "vlan",
                "vdu": [
                    {
                        "intCpd": [
                            {
                                "cpRole": "root or leaf",
                                "description": "description",
                                "layerProtocol": "E-LAN",
                                "internalIfRef": "0",
                                "cpdId": "vnf_vdu_cp_y2bv",
                                "intVirtualLinkDesc": "intVirtualLink11"
                            },
                            {
                                "cpRole": "root or leaf",
                                "description": "description",
                                "layerProtocol": "E-LAN",
                                "internalIfRef": "1",
                                "cpdId": "vnf_vdu_cp_y2bv1",
                                "intVirtualLinkDesc": "intVirtualLink12"
                            }
                        ],
                        "configurableProperties": {
                            "additionalVnfcConfigurableProperty": []
                        },
                        "virtualComputeDesc": "id",
                        "vduParent": "",
                        "bootOrder": [],
                        "name": "",
                        "virtualStorageDesc": "id",
                        "vduParentMandatory": "",
                        "swImageDesc": {
                            "swImage": "Reference to a SwImage",
                            "diskFormat": "Fat32",
                            "name": "Name",
                            "checksum": "checksum",
                            "supportedVirtualisationEnvironment": [
                                ""
                            ],
                            "minDisk": 500,
                            "operatingSystem": "operatingSystem",
                            "version": "0.1",
                            "minRam": 1,
                            "size": 300,
                            "id": "id",
                            "containerFormat": "containerFormat"
                        },
                        "vduNestedDesc": "vlan",
                        "vduId": "vnf_click_vdu_vlan",
                        "vduParentBareMetal": "",
                        "nfviConstraint": [
                            ""
                        ],
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "description": ""
                    }
                ],
                "vduNestedDesc": [
                    {
                        "name": "",
                        "vduNestedDescriptor": "vnf_click_vdu_vlan",
                        "checksum": "",
                        "version": "",
                        "vduNestedDescriptorType": "click",
                        "id": "vlan"
                    }
                ],
                "vnfdVersion": "0.1",
                "intVirtualLinkDesc": [
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "packetLossRatio": 5,
                                    "priority": 1
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "bitrateRequirements": {
                                    "leaf": 13,
                                    "root": 7
                                },
                                "monitoringParameter": {
                                    "id": "id",
                                    "name": "name",
                                    "performanceMetric": "performanceMetric"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "intVirtualLink11"
                    },
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "packetLossRatio": 5,
                                    "priority": 1
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "bitrateRequirements": {
                                    "leaf": 13,
                                    "root": 7
                                },
                                "monitoringParameter": {
                                    "id": "id",
                                    "name": "name",
                                    "performanceMetric": "performanceMetric"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "intVirtualLink12"
                    }
                ],
                "modifiableAttributes": {
                    "extension": [],
                    "metadata": []
                },
                "vnfExtCpd": [
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_vlan",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "intVirtualLink11"
                    },
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_vlan2",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "intVirtualLink12"
                    }
                ],
                "vnfIndicator": [
                    {
                        "source": "Enum",
                        "indicatorValue": [
                            ""
                        ],
                        "id": "id",
                        "name": "name"
                    }
                ],
                "virtualComputeDesc": [
                    {
                        "virtualMemory": {
                            "virtualMemOversubscriptionPolicy": "",
                            "virtualMemSize": 1,
                            "numaEnabled": false
                        },
                        "requestAdditionalCapabilities": [
                            {
                                "minRequestedAdditionalCapabilityVersion": "",
                                "preferredRequestedAdditionalCapabilityVersion": "",
                                "targetPerformanceParameters": [],
                                "requestedAdditionalCapabilityName": "",
                                "supportMandatory": true
                            }
                        ],
                        "virtualComputeDescId": "virtualComputeDescId",
                        "virtualCpu": {
                            "cpuArchitecture": "x86",
                            "numVirtualCpu": 2,
                            "virtualCpuOversubscriptionPolicy": "",
                            "virtualCpuClock": 2.6,
                            "virtualCpuPinning": {
                                "cpuPinningMap": "",
                                "cpuPinningPolicy": "Enum"
                            }
                        }
                    }
                ]
            },
            'ping': {
                "vnfSoftwareVersion": "0.1",
                "lifeCycleManagementScript": [
                    {
                        "event": [
                            ""
                        ],
                        "script": ""
                    }
                ],
                "autoScale": [
                    "script"
                ],
                "elementGroup": [
                    {
                        "virtualLinkDesc": [],
                        "vdu": [],
                        "description": "description",
                        "vnfdElementGroupId": "groupId"
                    }
                ],
                "configurableProperties": {
                    "instantiateVnfOpConfig": "",
                    "scaleVnfOpConfig": "",
                    "scaleVnfToLevelOpConfig": ""
                },
                "virtualStorageDesc": [
                    {
                        "rdmaEnabled": false,
                        "sizeOfStorage": 100,
                        "typeOfStorage": "volume",
                        "id": "id",
                        "swImageDesc": "reference SwImageDesc"
                    }
                ],
                "deploymentFlavour": [
                    {
                        "vduProfile": [
                            {
                                "affinityOrAntiAffinityGroupId": [
                                    "affinityOrAntiAffinityGroupId"
                                ],
                                "minNumberOfInstances": 1,
                                "vduId": "vduId",
                                "maxNumberOfInstances": 5,
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "virtualLinkProfile": [
                            {
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ],
                                "flavourId": "flavourId",
                                "affinityOrAntiAffinityGroupId": "affinityOrAntiAffinityGroupId",
                                "vnfVirtualLinkDescId": null
                            }
                        ],
                        "defaultInstantiationLevelId": "defaultInstantiationLevelId",
                        "instantiationLevel": [
                            {
                                "scaleInfo": {
                                    "scaleLevel": 1,
                                    "aspectId": "aspectId"
                                },
                                "description": "",
                                "levelId": "",
                                "vduLevel": [
                                    {
                                        "numberOfInstances": 5,
                                        "vduId": "vduId"
                                    }
                                ]
                            }
                        ],
                        "supportedOperation": [
                            "eum"
                        ],
                        "flavourId": "flavourId",
                        "affinityOrAntiAffinityGroup": [
                            {
                                "scope": "Enum",
                                "type": "Enum",
                                "groupId": "groupId"
                            }
                        ],
                        "scalingAspect": [
                            {
                                "associatedGroup": "reference to VnfdElementGroup",
                                "id": "id",
                                "maxScaleLevel": 10,
                                "description": "description",
                                "name": "name"
                            }
                        ],
                        "vnfLcmOperationsConfiguration": {
                            "healVnfOpConfig": {
                                "cause": [
                                    ""
                                ],
                                "parameter": [
                                    ""
                                ]
                            },
                            "terminateVnfOpConfig": {
                                "maxRecommendedGracefulTerminationtimeout": 5,
                                "minGracefulTerminationTimeout": 1
                            },
                            "operateVnfOpConfig": {
                                "minGracefulStopTimeout": 1,
                                "maxRecommendedGracefulStopTimeout": 5
                            },
                            "scaleVnfOpConfig": {
                                "scalingByMoreThanOneStepSupported": true,
                                "parameter": [
                                    ""
                                ]
                            },
                            "instantiateVnfOpConfig": {
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfToLevelOpConfig": {
                                "arbitraryTargetLevelsSupported": true,
                                "parameter": [
                                    ""
                                ]
                            }
                        },
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "description": "description"
                    }
                ],
                "vnfProvider": "netgroup",
                "vnfmInfo": [
                    "VNFM compatible"
                ],
                "vnfProductName": "vnf1",
                "vnfdId": "ping",
                "vdu": [
                    {
                        "intCpd": [
                            {
                                "cpRole": "root or leaf",
                                "description": "description",
                                "layerProtocol": "E-LAN",
                                "internalIfRef": "0",
                                "cpdId": "vnf_vdu_cp_k4ze",
                                "intVirtualLinkDesc": "vnf_vl"
                            }
                        ],
                        "configurableProperties": {
                            "additionalVnfcConfigurableProperty": []
                        },
                        "virtualComputeDesc": "id",
                        "vduParent": "",
                        "bootOrder": [],
                        "description": "",
                        "vduParentBareMetal": "",
                        "virtualStorageDesc": "id",
                        "vduParentMandatory": "",
                        "vduNestedDesc": "ping",
                        "swImageDesc": {
                            "swImage": "Reference to a SwImage",
                            "diskFormat": "Fat32",
                            "name": "Name",
                            "checksum": "checksum",
                            "supportedVirtualisationEnvironment": [
                                ""
                            ],
                            "minDisk": 500,
                            "id": "id",
                            "version": "0.1",
                            "minRam": 1,
                            "containerFormat": "containerFormat",
                            "operatingSystem": "operatingSystem",
                            "size": 300
                        },
                        "vduId": "vnf_click_vdu_ping",
                        "nfviConstraint": [
                            ""
                        ],
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "name": ""
                    }
                ],
                "vduNestedDesc": [
                    {
                        "name": "",
                        "vduNestedDescriptor": "vnf_click_vdu_ping",
                        "checksum": "",
                        "version": "",
                        "vduNestedDescriptorType": "click",
                        "id": "ping"
                    }
                ],
                "vnfdVersion": "0.1",
                "intVirtualLinkDesc": [
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "id": "id",
                                "name": "name",
                                "performanceMetric": "performanceMetric"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "packetLossRatio": 5,
                                    "priority": 1
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "bitrateRequirements": {
                                    "leaf": 13,
                                    "root": 7
                                },
                                "monitoringParameter": {
                                    "id": "id",
                                    "name": "name",
                                    "performanceMetric": "performanceMetric"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "vnf_vl"
                    }
                ],
                "modifiableAttributes": {
                    "extension": [],
                    "metadata": []
                },
                "vnfExtCpd": [
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_ping",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "vnf_vl"
                    }
                ],
                "vnfIndicator": [
                    {
                        "source": "Enum",
                        "indicatorValue": [
                            ""
                        ],
                        "id": "id",
                        "name": "name"
                    }
                ],
                "virtualComputeDesc": [
                    {
                        "virtualMemory": {
                            "virtualMemOversubscriptionPolicy": "",
                            "virtualMemSize": 1,
                            "numaEnabled": false
                        },
                        "requestAdditionalCapabilities": [
                            {
                                "minRequestedAdditionalCapabilityVersion": "",
                                "preferredRequestedAdditionalCapabilityVersion": "",
                                "targetPerformanceParameters": [],
                                "requestedAdditionalCapabilityName": "",
                                "supportMandatory": true
                            }
                        ],
                        "virtualComputeDescId": "virtualComputeDescId",
                        "virtualCpu": {
                            "cpuArchitecture": "x86",
                            "numVirtualCpu": 2,
                            "virtualCpuOversubscriptionPolicy": "",
                            "virtualCpuClock": 2.6,
                            "virtualCpuPinning": {
                                "cpuPinningMap": "",
                                "cpuPinningPolicy": "Enum"
                            }
                        }
                    }
                ]
            },
            'testvm': {
                "vnfSoftwareVersion": "0.1",
                "autoScale": [
                    "script"
                ],
                "elementGroup": [
                    {
                        "virtualLinkDesc": [],
                        "vdu": [],
                        "description": "description",
                        "vnfdElementGroupId": "groupId"
                    }
                ],
                "configurableProperties": {
                    "scaleVnfToLevelOpConfig": "",
                    "scaleVnfOpConfig": "",
                    "instantiateVnfOpConfig": ""
                },
                "vdu": [
                    {
                        "intCpd": [
                            {
                                "intVirtualLinkDesc": "vnf_vl_testvm",
                                "layerProtocol": "E-LAN",
                                "cpRole": "root or leaf",
                                "cpdId": "vnf_vdu_cp_to07",
                                "description": "description"
                            }
                        ],
                        "description": "",
                        "configurableProperties": {
                            "additionalVnfcConfigurableProperty": []
                        },
                        "bootOrder": [],
                        "virtualStorageDesc": "id",
                        "swImageDesc": {
                            "swImage": "alpine14-image",
                            "diskFormat": "Fat32",
                            "name": "Name",
                            "checksum": "checksum",
                            "supportedVirtualisationEnvironment": [
                                ""
                            ],
                            "minDisk": 500,
                            "operatingSystem": "operatingSystem",
                            "version": "0.1",
                            "minRam": 1,
                            "size": 300,
                            "id": "id",
                            "containerFormat": "containerFormat"
                        },
                        "vduId": "vnf_vdu_testvm",
                        "nfviConstraint": [
                            ""
                        ],
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "virtualComputeDesc": "id",
                        "name": ""
                    }
                ],
                "modifiableAttributes": {
                    "extension": [],
                    "metadata": []
                },
                "deploymentFlavour": [
                    {
                        "vduProfile": [
                            {
                                "maxNumberOfInstances": 5,
                                "minNumberOfInstances": 1,
                                "vduId": "vduId",
                                "affinityOrAntiAffinityGroupId": [
                                    "affinityOrAntiAffinityGroupId"
                                ],
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "virtualLinkProfile": [
                            {
                                "vnfVirtualLinkDescId": null,
                                "flavourId": "flavourId",
                                "affinityOrAntiAffinityGroupId": "affinityOrAntiAffinityGroupId",
                                "localAffinityOrAntiAffinityRule": [
                                    {
                                        "scope": "enum",
                                        "type": "Enum"
                                    }
                                ]
                            }
                        ],
                        "defaultInstantiationLevelId": "defaultInstantiationLevelId",
                        "instantiationLevel": [
                            {
                                "vduLevel": [
                                    {
                                        "numberOfInstances": 5,
                                        "vduId": "vduId"
                                    }
                                ],
                                "description": "",
                                "levelId": "",
                                "scaleInfo": {
                                    "scaleLevel": 1,
                                    "aspectId": "aspectId"
                                }
                            }
                        ],
                        "supportedOperation": [
                            "eum"
                        ],
                        "flavourId": "flavourId",
                        "affinityOrAntiAffinityGroup": [
                            {
                                "scope": "Enum",
                                "type": "Enum",
                                "groupId": "groupId"
                            }
                        ],
                        "scalingAspect": [
                            {
                                "associatedGroup": "reference to VnfdElementGroup",
                                "maxScaleLevel": 10,
                                "description": "description",
                                "name": "name",
                                "id": "id"
                            }
                        ],
                        "vnfLcmOperationsConfiguration": {
                            "healVnfOpConfig": {
                                "parameter": [
                                    ""
                                ],
                                "cause": [
                                    ""
                                ]
                            },
                            "terminateVnfOpConfig": {
                                "maxRecommendedGracefulTerminationtimeout": 5,
                                "minGracefulTerminationTimeout": 1
                            },
                            "operateVnfOpConfig": {
                                "minGracefulStopTimeout": 1,
                                "maxRecommendedGracefulStopTimeout": 5
                            },
                            "instantiateVnfOpConfig": {
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfOpConfig": {
                                "scalingByMoreThanOneStepSupported": true,
                                "parameter": [
                                    ""
                                ]
                            },
                            "scaleVnfToLevelOpConfig": {
                                "parameter": [
                                    ""
                                ],
                                "arbitraryTargetLevelsSupported": true
                            }
                        },
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "description": "description"
                    }
                ],
                "vnfProvider": "netgroup",
                "vnfmInfo": [
                    "VNFM compatible"
                ],
                "vnfProductName": "vnf1",
                "vnfdId": "testvm",
                "virtualStorageDesc": [
                    {
                        "rdmaEnabled": false,
                        "sizeOfStorage": 100,
                        "typeOfStorage": "volume",
                        "id": "id",
                        "swImageDesc": "reference SwImageDesc"
                    }
                ],
                "vnfdVersion": "0.1",
                "intVirtualLinkDesc": [
                    {
                        "testAccess": [
                            ""
                        ],
                        "description": "",
                        "monitoringParameter": [
                            {
                                "performanceMetric": "performanceMetric",
                                "id": "id",
                                "name": "name"
                            }
                        ],
                        "virtualLinkDescFlavour": [
                            {
                                "testAccess": "",
                                "bitrateRequirements": {
                                    "root": 7,
                                    "leaf": 13
                                },
                                "description": "",
                                "flavourId": "flavourId",
                                "connectivityType": {
                                    "layerProtocol": "Enum",
                                    "flowPattern": ""
                                },
                                "qos": {
                                    "packetDelayVariation": 50,
                                    "latency": 500,
                                    "priority": 1,
                                    "packetLossRatio": 5
                                },
                                "monitoringParameter": {
                                    "performanceMetric": "performanceMetric",
                                    "id": "id",
                                    "name": "name"
                                }
                            }
                        ],
                        "connectivityType": {
                            "layerProtocol": "Enum",
                            "flowPattern": ""
                        },
                        "virtualLinkDescId": "vnf_vl_testvm"
                    }
                ],
                "lifeCycleManagementScript": [
                    {
                        "event": [
                            ""
                        ],
                        "script": ""
                    }
                ],
                "vnfExtCpd": [
                    {
                        "intCpd": null,
                        "cpRole": "root or leaf",
                        "description": "description",
                        "layerProtocol": "E-LAN",
                        "cpdId": "vnf_ext_cp_testvm",
                        "virtualNetworkInterfaceRequirements": {
                            "requirement": "",
                            "description": "description",
                            "supportMandatory": true,
                            "name": "name"
                        },
                        "intVirtualLinkDesc": "vnf_vl_testvm"
                    }
                ],
                "vnfIndicator": [
                    {
                        "source": "Enum",
                        "indicatorValue": [
                            ""
                        ],
                        "id": "id",
                        "name": "name"
                    }
                ],
                "virtualComputeDesc": [
                    {
                        "virtualMemory": {
                            "virtualMemOversubscriptionPolicy": "",
                            "virtualMemSize": 1,
                            "numaEnabled": false
                        },
                        "virtualCpu": {
                            "cpuArchitecture": "x86",
                            "numVirtualCpu": 2,
                            "virtualCpuOversubscriptionPolicy": "",
                            "virtualCpuClock": 2.6,
                            "virtualCpuPinning": {
                                "cpuPinningMap": "",
                                "cpuPinningPolicy": "Enum"
                            }
                        },
                        "virtualComputeDescId": "virtualComputeDescId",
                        "requestAdditionalCapabilities": [
                            {
                                "minRequestedAdditionalCapabilityVersion": "",
                                "preferredRequestedAdditionalCapabilityVersion": "",
                                "targetPerformanceParameters": [],
                                "requestedAdditionalCapabilityName": "",
                                "supportMandatory": true
                            }
                        ]
                    }
                ]
            }
        }
    }
};

function getNestedDesc(vnfd_data, vdu_nested_desc_id) {
    var result = {};
    for (n in vnfd_data.vduNestedDesc){
        if(vnfd_data.vduNestedDesc[n].id == vdu_nested_desc_id)
            return vnfd_data.vduNestedDesc[n];
    }
    return result;
}

function createImageCLick(vduId) {
    console.log("createImageCLick " + vduId);
    //TODO add exception on command errors

    var result;
    /*
        # create a new image corresponding to the click configuration
        cp "$STAMINALCLICKOSIMAGE" "${YAMLDIR}/clickos_${vduid}"
        $CLICKINJECTOR "${vduid}.click" "${YAMLDIR}/clickos_${vduid}"
        chmod u+rw "${YAMLDIR}/clickos_${vduid}"

    */
    var image_file_name = 'clickos_' + vduId;
    var new_image_path = YAMLDIR+'/'+image_file_name;
    var commands = [
        ['cp', STAMINALCLICKOSIMAGE, new_image_path],
        [CLICKINJECTOR, vduId+'.click', new_image_path],
        ['chmod', 'u+rw', new_image_path]
    ];
    for(c in commands){
        var command = commands[c][0];
        commands[c].shift();
        //console.log("Command: " + command + " args: " + commands[c])
        ////console.log(typeof commands[c])
        var exec_res = sync(command, commands[c])
        ////console.log("###########")
        ////console.log(JSON.stringify(exec_res))
        ////console.log("###########")
    }

    result = new_image_path;
    return result;
}

function uploadImage(image_yaml_path) {
    console.log("uploadImage " + image_yaml_path);
    //TODO add exception on command errors

    var result = true;
    /*
    scp -P${OPENVIMHOSTPORT} "${YAMLDIR}/clickos_${vduid}" ${OPENVIMHOSTUSERNAME}@${OPENVIMHOST}:/var/lib/libvirt/images/
     */
    var args = [ '-P'+OPENVIMHOSTPORT, image_yaml_path, OPENVIMHOSTUSERNAME+"@"+OPENVIMHOST+":/var/lib/libvirt/images/"];
    //console.log("Command: cp  " + args);
    var exec_res = sync('scp', args);

    return result;
}

function generateImageYaml(vduId) {
    console.log("generateImageYaml " + vduId);
    var result;
    var image_file_name = 'image-clickos-' + vduId + '.yaml';
    var new_image_path = YAMLDIR+'/'+image_file_name;
    var image_yaml_template = "image:\n" +
        "    name:         clickos-"+vduId+"\n" +
        "    description:  click-os "+vduId+" image\n" +
        "    path:         /var/lib/libvirt/images/clickos_"+vduId+"\n" +
        "    metadata:     # Optional extra metadata of the image. All fields are optional\n" +
        "        use_incremental: \"no\"          # \"yes\" by default, \"no\" Deployed using a incremental qcow2 image\n";
    //FIXME ADD try catch
    fs.writeFileSync(new_image_path,image_yaml_template);
    result = new_image_path;
    return result;
}

function onboardImage(image_yaml_path) {
    console.log("onboardImage " + image_yaml_path);
    var result;
    var args = ['image-create', image_yaml_path];
    // UUID_images[${vduid}]=$($OPENVIM image-create ${YAMLDIR}/image-clickos-${vduid}.yaml | awk '{print $1}')
    //TODO execute and return UUID
    console.log("Command: " + OPENVIM + " " + args);
    var exec_res = sync(OPENVIM, args);
    if (exec_res.status == 0) {
        console.log("exec_res.status: " +  exec_res.status)
        console.log("exec_res: ");
        console.log(JSON.stringify(exec_res.stdout.toString().split(' ')));
        var output_split = exec_res.stdout.toString().split(' ');

        result = (output_split[0] != "") ? output_split[0] : output_split[1];
        console.log("UUID: " + result);
    }
    return result;
}

function getSwImageUUID(swImage) {
    console.log("getSwImageUUID " + swImage);
    var result;
    var args = ['image-list', swImage];
    //TODO execute and return UUID
    console.log("Command: " +OPENVIM + " " + args);
    var exec_res = sync(OPENVIM, args);
    console.log("exec_res.status: " +  exec_res.status);
    if (exec_res.status == 0) {
        console.log("exec_res: ");
        console.log(JSON.stringify(exec_res.stdout.toString().split(' ')));
        var output_split = exec_res.stdout.toString().split(' ');
        result = (output_split[0] != "") ? output_split[0] : output_split[1];
        console.log("UUID: " + result);
    }
    return result;
}

function generateNetworkYaml(virtualLinkDescId) {
    console.log("generateNetworkYaml " + virtualLinkDescId);
    var result;

    var net_file_name = 'net-' + virtualLinkDescId + '.yaml';
    var new_net_path = YAMLDIR+'/'+net_file_name;
    var yaml_template = "network:\n" +
        "    name:               net-"+virtualLinkDescId+"\n" +
        "    type:               bridge_data\n" +
        "    provider:           OVS:default\n" +
        "    enable_dhcp:        false\n" +
        "    shared:             false";

    //FIXME
    //TODO write yaml to file
    fs.writeFileSync(new_net_path, yaml_template);
    result = new_net_path;
    return result;
}

function onboardNetwork(net_yaml_path) {
    console.log("onboardNetwork " + net_yaml_path);
    var result;
    var args = [ 'net-create', net_yaml_path];
    // UUID_networks[${vlid}]=$($OPENVIM net-create ${YAMLDIR}/net-${vlid}.yaml | awk '{print $1}')
    // TODO execute and return UUID
    console.log("Command: " +OPENVIM + " " + args);
    var exec_res = sync(OPENVIM, args);
    console.log("exec_res.status: " +  exec_res.status);
    if (exec_res.status == 0) {
        console.log("exec_res: ");
        console.log(JSON.stringify(exec_res.stdout.toString().split(' ')));
        var output_split = exec_res.stdout.toString().split(' ');
        result = (output_split[0] != "") ? output_split[0] : output_split[1];
        console.log("UUID: " + result);
    }
    return result;
}

function createOVSBridge(net_UUID) {
    console.log("createOVSBridge " + net_UUID);
    var result;
    var args_vlanid = ['net-list', '-vvv', net_UUID]; //, '|', 'grep', "'provider:vlan'", '|', "awk '{print $2}'"];
    // vlanid=$($OPENVIM net-list -vvv $uuid | grep 'provider:vlan' | awk '{print $2}')
    console.log("Command: " + OPENVIM +" " + args_vlanid);
    var exec_res_vlaid = sync(OPENVIM, args_vlanid);
    console.log("exec_res_vlaid.status: " +  exec_res_vlaid.status);
    //if (args_vlanid.status == 0) {
        console.log("exec_res_vlaid: ");
        console.log(JSON.stringify(exec_res_vlaid.stdout.toString()));
        var output_string = exec_res_vlaid.stdout.toString();
        var yaml_object = YAML.parse(output_string.substring(output_string.indexOf("\n") + 1));
        console.log(JSON.stringify(yaml_object));
        console.log(yaml_object['network']['provider:vlan']);
        var vlanid = yaml_object['network']['provider:vlan'] ;//=  (output_split[0] != "") ? output_split[0] : output_split[1];
        // TODO take vlanid
        var args_ssh = [OPENVIMHOSTUSERNAME+'@'+OPENVIMHOST, '-p', OPENVIMHOSTPORT, 'sudo', 'ovs-vsctl', '--may-exist', 'add-br', 'ovim-'+ vlanid];
        console.log("Command: ssh " + args_ssh);
        var exec_res_ssh = sync('ssh', args_ssh);
        console.log("exec_res_ssh: ");
        console.log(JSON.stringify(exec_res_ssh));
        // TODO add try catch
   // }


    return result;
}

function initFile(path) {
    var fs = require("fs");
    fs.openSync(path,'w');
}

function randomMacAddress() {
    var mac_random = "00:15:17:XX:XX:XX".replace(/X/g, function() {
        return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
    });
    return mac_random;
}

function generateVMYaml(args) {
    console.log("generateVMYaml " + JSON.stringify(args));
    var result;
    //vnfid, uuidImage, vduhypervisor, vduflavor, vdu_id, NETUUIDS
    var vm_name ='vm-' + args.vduhypervisor+'-' + args.vnfid;
    var vm_file_name = vm_name + '.yaml';
    var new_vm_path = YAMLDIR+'/'+vm_file_name;
    var yaml_template =
        "server:\n" +
        "  name: "+vm_name+"\n" +
        "  description: \""+VMTYPES[args.vduhypervisor] +" VM\"\n" +
        "  imageRef: '"+args.uuidImage+"'\n" +
        "  flavorRef: '"+args.vduflavor+"'\n" +
        "  start:    \"yes\"\n" +
        "  hypervisor: \""+args.vduhypervisor+"\"\n" +
        "  osImageType: \"" + IMAGETYPES[args.vduhypervisor] + "\"\n" +
        "  networks:\n";
    for(k in args.netuuids){
        ////console.log(k + " --- " + args.netuuids[k])
        var network =
            "  - name: net-"+args.vdu_id+"_vif"+ k + "\n" +
            "    uuid: "+args.netuuids[k]+"\n" +
            "    mac_address: " + randomMacAddress() + "\n";
        yaml_template += network;
        //console.log(network)

    }
    //TODO write yaml to file
    fs.writeFileSync(new_vm_path, yaml_template);
    result = new_vm_path;
    return result;
}
function onboardVm(vm_yaml_path){
    console.log("onboardVm " + vm_yaml_path);
    var result;
    var args = ['vm-create', vm_yaml_path];
    //VMUUID=$($OPENVIM vm-create ${YAMLDIR}/vm-${vnfid}.yaml | awk '{print $1}')
    // TODO execute and return UUID
    console.log("Command: " + OPENVIM + " " + args);
    var exec_res = sync(OPENVIM, args);

    console.log("exec_res.status: " +  exec_res.status)
    console.log("exec_res: ");
    console.log(JSON.stringify(exec_res.stdout.toString()));
    if( exec_res.status == 0){

        var output_split = exec_res.stdout.toString().split(' ');
        result = (output_split[0] != '') ? output_split[0] : output_split[1];
            console.log("UUID: " + result);
    }
    return result;
}


function main(){
    //TODO create YAMLDIR if not exist

    // 1. create and onboard the ClickOS images
    for(vnfid in deployment_data.deployment_descriptor.vnfd){
        //console.log("VNFD_ID: " + vnfid);
        var current_vnfd = deployment_data.deployment_descriptor.vnfd[vnfid];
        var vdu_list = current_vnfd.vdu;
        for(v in vdu_list){
            var vdu = vdu_list[v]
            //console.log("VDU id: " + vdu.vduId);
            if (vdu.vduNestedDesc){
                var nestedDesc = getNestedDesc(current_vnfd, vdu.vduNestedDesc);
                //console.log(nestedDesc.vduNestedDescriptorType)
                //Click VDU
                if(nestedDesc.vduNestedDescriptorType == "click"){
                    //create a new image corresponding to the click configuration
                    var new_image_path = createImageCLick(vdu.vduId);
                    if(new_image_path != undefined){

                        // upload image to the server. The way to do this is not defined by openvim, so we use scp
                        uploadImage(new_image_path);

                        // create the yaml for the image
                        var image_yaml_path = generateImageYaml(vdu.vduId);
                        // onboard the image and get its UUID
                        var image_UUID = onboardImage(image_yaml_path);
                        UUID_images[vdu.vduId] = image_UUID;
                        VDUHYPERVISOR[vdu.vduId] = "xen-unik";
                        VDUFLAVOR[vdu.vduId] = CLICKFLAVORUUID;
                    }

                }
            }
            else{
                // ASSUMPTION: we have a "normal" VDU, which corresponds to an HVM virtual machine
                // find the image UUID corresponding to swImageDesc
                var swImage = vdu.swImageDesc.swImage;
                var swimageUUID = getSwImageUUID(swImage);
                UUID_images[vdu.vduId] = swimageUUID;
                VDUHYPERVISOR[vdu.vduId] = "xenhvm";
                VDUFLAVOR[vdu.vduId] = VMFLAVOURUUID;
            }
            if( VNF2VDU[vnfid] == undefined)
                VNF2VDU[vnfid] = []
            VNF2VDU[vnfid].push(vdu.vduId)
        }
    }

    // 2. create the networks corresponding to the virtuallinks
    for(v in deployment_data.deployment_descriptor.nsd['nsd']['virtualLinkDesc']){
        var vld = deployment_data.deployment_descriptor.nsd['nsd']['virtualLinkDesc'][v];
    //console.log("virtualLinkDescId: " + vld.virtualLinkDescId);
        // create the yaml for the network corresponding to the virtuallink
        var net_yaml_path = generateNetworkYaml(vld.virtualLinkDescId)
        // onboard the network and get its UUID
        var net_UUID = onboardNetwork(net_yaml_path);
        UUID_networks[vld.virtualLinkDescId] = net_UUID;

        // openvim does not yet create the ovs bridge automatically, so here we create it manually
        createOVSBridge(net_UUID);
    }

    // 3. create the VNFs, using references to the created images and networks

    // prepare/reset the file which will contain the VM UUIDs
    initFile(YAMLDIR + '/vmuuids.txt');

    // find the mapping between each virtualLinkProfileId and virtualLinkDescId
    // ASSUMPTION: we have only one nsDf in the NSD
    // populate the VLPID2VLID array
    var nsDf = deployment_data.deployment_descriptor.nsd['nsd']['nsDf'][0];
    for(p in nsDf.virtualLinkProfile){
        var vlp = nsDf.virtualLinkProfile[p];
        VLPID2VLID[vlp.virtualLinkProfileId] = vlp.virtualLinkDescId;
    }
    //console.log("VLPID2VLID: " + JSON.stringify(VLPID2VLID));

    for(vnfid in deployment_data.deployment_descriptor.vnfd) {
        //console.log("VNFD_ID: " + vnfid);
        var vnfd = deployment_data.deployment_descriptor.vnfd[vnfid];
        // ASSUMPTION only one VDU IN VNF
        var vdu_id = VNF2VDU[vnfid][0];
        var image_UUID = UUID_images[vdu_id];
        console.log("VDU_ID: " + vdu_id);
        console.log("image_UUID: " + image_UUID);
        var NETUUIDS = {};
        // search for the connection points of this VNF in the nsd, and their associated virtualLinkProfileId, to find the UUIDs of the networks
        // ASSUMPTION: on a virtuallink there is at most one extCP per VNF (i.e. a VNF does not have two interfaces on the same network)
        for(p in nsDf.vnfProfile){
            var vnfProfile = nsDf.vnfProfile[p];
            console.log("#### "+vnfProfile.vnfdId + " " + vnfid);
            if (vnfProfile.vnfdId == vnfid) {
                for (n in vnfProfile.nsVirtualLinkConnectivity) {
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
                        console.log(virtualLinkProfileId + " " + vlid + " " + netUUID);
                        for (i in vnfd.vnfExtCpd) {
                            var vnfExtCpd = vnfd.vnfExtCpd[i];

                            if (vnfExtCpd.cpdId == cpdId) {
                                console.log("vnfExtCpd.cpdId == cpdId")
                                var intVirtualLinkDesc = vnfExtCpd.intVirtualLinkDesc;
                                for (u in vnfd.vdu) {
                                    var current_vdu = vnfd.vdu[u];
                                    var index_no_internalIfRef = 0;
                                    for (d in current_vdu.intCpd) {
                                        var intCpd = current_vdu.intCpd[d];
                                        if (intCpd.intVirtualLinkDesc == intVirtualLinkDesc ) {
                                            if(intCpd.internalIfRef != undefined)
                                                NETUUIDS[intCpd.internalIfRef] = netUUID;
                                            else{
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
                var vm_yaml_path = generateVMYaml({
                    vnfid: vnfid,
                    uuidImage: UUID_images[vdu_id],
                    vduhypervisor: VDUHYPERVISOR[vdu_id],
                    vduflavor: VDUFLAVOR[vdu_id],
                    vdu_id: vdu_id,
                    netuuids: NETUUIDS
                });
                var vm_uuid = onboardVm(vm_yaml_path);
                //TODO APPEND to vm_uuid list
            }
        }

    }
}

main();