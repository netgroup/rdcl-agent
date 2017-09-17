var YAML = require('yamljs');

var exec_vm_result = "5837801b-989a-11e7-97af-0cc47a7794c0   vm-xen-unik-firewall ACTIVE\n" +
    "server:\n" +
    "    created: '2017-09-13T17:43:54'\n" +
    "    description: ClickOS VM\n" +
    "    flavor:\n" +
    "        id: 5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/flavors/5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "            rel: bookmark\n" +
    "    hostId: 609034b2-25d3-11e7-ad8f-0cc47a7794be\n" +
    "    hypervisor: xen-unik\n" +
    "    id: 5837801b-989a-11e7-97af-0cc47a7794c0\n" +
    "    image:\n" +
    "        id: 510f859e-989a-11e7-97af-0cc47a7794c0\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/images/510f859e-989a-11e7-97af-0cc47a7794c0\n" +
    "            rel: bookmark\n" +
    "    name: vm-xen-unik-firewall\n" +
    "    networks:\n" +
    "    -   iface_id: 5837801c-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:B0:3F:E4\n" +
    "        name: net-vnf_click_vdu_fwall_vif0\n" +
    "        net_id: 55fccbad-989a-11e7-97af-0cc47a7794c0\n" +
    "    -   iface_id: 5837801d-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:A1:0C:FE\n" +
    "        name: net-vnf_click_vdu_fwall_vif1\n" +
    "        net_id: 576b0382-989a-11e7-97af-0cc47a7794c0\n" +
    "    osImageType: clickos\n" +
    "    progress: 100\n" +
    "    ram: 8\n" +
    "    status: ACTIVE\n" +
    "    tenant_id: 96035cba-b313-11e6-866f-0cc47a7794be\n" +
    "    vcpus: 1\n" +
    "\n" +
    "5837801e-989a-11e7-97af-0cc47a7794c0   vm-xen-unik-vlan     ACTIVE\n" +
    "server:\n" +
    "    created: '2017-09-13T17:43:54'\n" +
    "    description: ClickOS VM\n" +
    "    flavor:\n" +
    "        id: 5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/flavors/5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "            rel: bookmark\n" +
    "    hostId: 609034b2-25d3-11e7-ad8f-0cc47a7794be\n" +
    "    hypervisor: xen-unik\n" +
    "    id: 5837801e-989a-11e7-97af-0cc47a7794c0\n" +
    "    image:\n" +
    "        id: 53293262-989a-11e7-97af-0cc47a7794c0\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/images/53293262-989a-11e7-97af-0cc47a7794c0\n" +
    "            rel: bookmark\n" +
    "    name: vm-xen-unik-vlan\n" +
    "    networks:\n" +
    "    -   iface_id: 5837801f-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:62:09:1A\n" +
    "        name: net-vnf_click_vdu_vlan_vif0\n" +
    "        net_id: 5837801a-989a-11e7-97af-0cc47a7794c0\n" +
    "    -   iface_id: 58378020-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:F1:1A:DC\n" +
    "        name: net-vnf_click_vdu_vlan_vif1\n" +
    "        net_id: 55fccbad-989a-11e7-97af-0cc47a7794c0\n" +
    "    osImageType: clickos\n" +
    "    progress: 100\n" +
    "    ram: 8\n" +
    "    status: ACTIVE\n" +
    "    tenant_id: 96035cba-b313-11e6-866f-0cc47a7794be\n" +
    "    vcpus: 1\n" +
    "\n" +
    "596e66c4-989a-11e7-97af-0cc47a7794c0   vm-xen-unik-ping     ACTIVE\n" +
    "server:\n" +
    "    created: '2017-09-13T17:43:55'\n" +
    "    description: ClickOS VM\n" +
    "    flavor:\n" +
    "        id: 5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/flavors/5a258552-0a51-11e7-a086-0cc47a7794be\n" +
    "            rel: bookmark\n" +
    "    hostId: 609034b2-25d3-11e7-ad8f-0cc47a7794be\n" +
    "    hypervisor: xen-unik\n" +
    "    id: 596e66c4-989a-11e7-97af-0cc47a7794c0\n" +
    "    image:\n" +
    "        id: 55fccbac-989a-11e7-97af-0cc47a7794c0\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/images/55fccbac-989a-11e7-97af-0cc47a7794c0\n" +
    "            rel: bookmark\n" +
    "    name: vm-xen-unik-ping\n" +
    "    networks:\n" +
    "    -   iface_id: 596e66c5-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:FC:05:7E\n" +
    "        name: net-vnf_click_vdu_ping_vif0\n" +
    "        net_id: 576b0382-989a-11e7-97af-0cc47a7794c0\n" +
    "    osImageType: clickos\n" +
    "    progress: 100\n" +
    "    ram: 8\n" +
    "    status: ACTIVE\n" +
    "    tenant_id: 96035cba-b313-11e6-866f-0cc47a7794be\n" +
    "    vcpus: 1\n" +
    "\n" +
    "596e66c6-989a-11e7-97af-0cc47a7794c0   vm-xenhvm-testvm     ACTIVE\n" +
    "server:\n" +
    "    created: '2017-09-13T17:43:55'\n" +
    "    description: HVM VM\n" +
    "    flavor:\n" +
    "        id: 40f7908a-3bb0-11e7-ad8f-0cc47a7794be\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/flavors/40f7908a-3bb0-11e7-ad8f-0cc47a7794be\n" +
    "            rel: bookmark\n" +
    "    hostId: 609034b2-25d3-11e7-ad8f-0cc47a7794be\n" +
    "    hypervisor: xenhvm\n" +
    "    id: 596e66c6-989a-11e7-97af-0cc47a7794c0\n" +
    "    image:\n" +
    "        id: ebffd59e-3bb2-11e7-ad8f-0cc47a7794be\n" +
    "        links:\n" +
    "        -   href: http://0.0.0.0:9080/openvim/96035cba-b313-11e6-866f-0cc47a7794be/images/ebffd59e-3bb2-11e7-ad8f-0cc47a7794be\n" +
    "            rel: bookmark\n" +
    "    name: vm-xenhvm-testvm\n" +
    "    networks:\n" +
    "    -   iface_id: 596e66c7-989a-11e7-97af-0cc47a7794c0\n" +
    "        mac_address: 00:15:17:F3:93:8E\n" +
    "        name: net-vnf_vdu_testvm_vif0\n" +
    "        net_id: 5837801a-989a-11e7-97af-0cc47a7794c0\n" +
    "    osImageType: clickos\n" +
    "    progress: 100\n" +
    "    ram: 1024\n" +
    "    status: ACTIVE\n" +
    "    tenant_id: 96035cba-b313-11e6-866f-0cc47a7794be\n" +
    "    vcpus: 1\n" +
    "\n";

var exec_net_result = "55fccbad-989a-11e7-97af-0cc47a7794c0   net-vl1              ACTIVE\n" +
    "network:\n" +
    "    admin_state_up: true\n" +
    "    enable_dhcp: false\n" +
    "    id: 55fccbad-989a-11e7-97af-0cc47a7794c0\n" +
    "    name: net-vl1\n" +
    "    ports:\n" +
    "    -   port_id: 5837801c-989a-11e7-97af-0cc47a7794c0\n" +
    "    -   port_id: 58378020-989a-11e7-97af-0cc47a7794c0\n" +
    "    provider:physical: OVS:3056\n" +
    "    provider:vlan: 3056\n" +
    "    shared: false\n" +
    "    status: ACTIVE\n" +
    "    type: bridge_data\n" +
    "\n" +
    "576b0382-989a-11e7-97af-0cc47a7794c0   net-vl2              ACTIVE\n" +
    "network:\n" +
    "    admin_state_up: true\n" +
    "    enable_dhcp: false\n" +
    "    id: 576b0382-989a-11e7-97af-0cc47a7794c0\n" +
    "    name: net-vl2\n" +
    "    ports:\n" +
    "    -   port_id: 5837801d-989a-11e7-97af-0cc47a7794c0\n" +
    "    -   port_id: 596e66c5-989a-11e7-97af-0cc47a7794c0\n" +
    "    provider:physical: OVS:3057\n" +
    "    provider:vlan: 3057\n" +
    "    shared: false\n" +
    "    status: ACTIVE\n" +
    "    type: bridge_data\n" +
    "\n" +
    "5837801a-989a-11e7-97af-0cc47a7794c0   net-vl3              ACTIVE\n" +
    "network:\n" +
    "    admin_state_up: true\n" +
    "    enable_dhcp: false\n" +
    "    id: 5837801a-989a-11e7-97af-0cc47a7794c0\n" +
    "    name: net-vl3\n" +
    "    ports:\n" +
    "    -   port_id: 5837801f-989a-11e7-97af-0cc47a7794c0\n" +
    "    -   port_id: 596e66c7-989a-11e7-97af-0cc47a7794c0\n" +
    "    provider:physical: OVS:3058\n" +
    "    provider:vlan: 3058\n" +
    "    shared: false\n" +
    "    status: ACTIVE\n" +
    "    type: bridge_data\n" +
    "\n" +
    "7ca6d504-3ca6-11e7-ad8f-0cc47a7794be   alpine_man           ACTIVE\n" +
    "network:\n" +
    "    admin_state_up: true\n" +
    "    enable_dhcp: false\n" +
    "    id: 7ca6d504-3ca6-11e7-ad8f-0cc47a7794be\n" +
    "    name: alpine_man\n" +
    "    provider:physical: OVS:3001\n" +
    "    provider:vlan: 3001\n" +
    "    shared: false\n" +
    "    status: ACTIVE\n" +
    "    type: bridge_data\n" +
    "\n" +
    "af196508-10b2-11e7-89a7-70e42283d098   default              ACTIVE\n" +
    "network:\n" +
    "    admin_state_up: true\n" +
    "    enable_dhcp: false\n" +
    "    id: af196508-10b2-11e7-89a7-70e42283d098\n" +
    "    name: default\n" +
    "    provider:physical: OVS:3003\n" +
    "    provider:vlan: 3003\n" +
    "    shared: true\n" +
    "    status: ACTIVE\n" +
    "    type: bridge_data\n" +
    "\n";
/*
var net_list = ['net-vl1', 'net-vl2', 'net-vl3']
var result = {
    'vertices':[],
    'edges': []
}
var net_data = exec_net_result.replace(/(^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})([\s]+)(.)+\nnetwork:)/mg, function (token) {
    var res = token.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/)
    if(res && res.length >0)
        return res[0] + ":";
    return "Error";
});

var vms_data = exec_result.replace(/(^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})([\s]+)(.)+\nserver:)/mg, function (token) {
    var res = token.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/)
    if(res && res.length >0)
        return res[0] + ":";
    return "Error";
});

var yaml_object = YAML.parse(vms_data);
//console.log(net_data)
var yaml_net_object = YAML.parse(net_data);

for(uuid in yaml_net_object){
    var vertice = {
        "info": {
            "group": [],
            "property": {
                "custom_label": "",
                "net_uuid": uuid,
            },
            "type": "ns_vl"

        },
        "id": yaml_net_object[uuid]['name']
    };
    result.vertices.push(vertice);
    for(p in yaml_net_object[uuid].ports){
        var edge ={
            "source": uuid,
            "group": [],
            "target": yaml_net_object[uuid].ports[p].port_id,
            "view": "ns"
        };
        result.edges.push(edge);
        console.log(edge);
    }

}

for(uuid in yaml_object){
    var vertice = {
        "info": {
            "group": [],
            "property": {
                "custom_label": "",
                "ovim_uuid": uuid,
            },
            "type": "vnf",

        },
        "id": yaml_object[uuid]['name']
    };
    result.vertices.push(vertice);
}

*/

var result = {
    "edges": [],
    "vertices": []
};

var args_vm = ['vm-list', '-vvv'];
//var exec_vm_result = this._executeOpenVimClientCommand(args_vm);

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
                    "custom_label": "",
                    "ovim_uuid": uuid,
                },
                "type": "vnf"

            },
            "id": yaml_object[uuid]['name']
        };
        result.vertices.push(vertice);
    }

    var args_net = ['net-list', '-vvv'];
    //var exec_net_result = this._executeOpenVimClientCommand(args_net);

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
                        "custom_label": "",
                        "net_uuid": uuid_net,
                    },
                    "type": "ns_vl"

                },
                "id": yaml_net_object[uuid_net]['name']
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
                console.log(edge);
            }

        }
    }

    var _ = require('underscore');
    edges = _.pluck(result.edges, 'id');
    result.vertices = _.filter(result.vertices, function (v) {
        if(edges.indexOf(v.source) >-1 && edges.indexOf(v.target) >-1)
            return v;
    })

    console.log(result);
}