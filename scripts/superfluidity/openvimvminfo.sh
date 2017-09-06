#!/bin/bash
# connect to a remote virsh console

VMNAME=$1
VMUUIDSFILE=/home/rfb/ovim-agent/scripts/superfluidity/yamls/vmuuids.txt

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

