#!/bin/bash
# connect to a remote virsh console
QUERY_STRING=$1
arr=(${QUERY_STRING//[=&]/ })
UUID=${arr[1]}

if [ -z "$UUID" ]; then
    echo "Usage: $0 <vm uuid>"
    exit 1
fi

# connect to the remote console
ssh -p2222 -t root@127.0.0.1 "bash -c \"virsh -c xen:/// console $UUID\""
