#!/bin/bash
# connect to a remote virsh console
QUERY_STRING=$1
arr=(${QUERY_STRING//[=&]/ })
VMNAME=${arr[1]}
VMUUIDSFILE=/home/rfb/vim-agent/scripts/superfluidity/yamls/vmuuids.txt

if [ -z "$VMNAME" ]; then
    echo "Usage: $0 <vm name>"
    exit 1
fi

# find the VM UUID
UUID=$(egrep "\b$VMNAME\b" $VMUUIDSFILE | awk -F ':' '{print $2}')
if [ -z "$UUID" ];then
    echo "$VMNAME not found"
    exit 2
fi

# connect to the remote console
ssh -p2222 -t root@127.0.0.1 "bash -c \"virsh -c xen:/// console $UUID\""
