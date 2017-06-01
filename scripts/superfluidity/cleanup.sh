#!/bin/bash

source /home/openvim/openvim-one/openvim/env.sh

OPENVIM="/home/openvim/openvim-one/openvim/openvim" 

$OPENVIM vm-delete -f vm-xen-unik-vlan
$OPENVIM vm-delete -f vm-xen-unik-ping
$OPENVIM vm-delete -f vm-xen-unik-firewall
$OPENVIM vm-delete -f vm-xenhvm-testvm

$OPENVIM net-delete -f net-vl1
$OPENVIM net-delete -f net-vl2
$OPENVIM net-delete -f net-vl3
$OPENVIM net-delete -f net-ns_vl_ymah

$OPENVIM image-delete -f clickos-vnf_click_vdu_ping
$OPENVIM image-delete -f clickos-vnf_click_vdu_fwall
$OPENVIM image-delete -f clickos-vnf_click_vdu_vlan


