var Deployment = require('../api/controllers/superfluidity/nsd/openvim/deployment');


var ovdeployment = new Deployment({
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
});

ovdeployment.launch(function(){
	console.log("Deployment started.");
}, function(error){
	console.log("Error launch Deployment.");
});
