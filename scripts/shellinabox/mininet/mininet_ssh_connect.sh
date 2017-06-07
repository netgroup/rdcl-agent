#!/bin/bash
QUERY_STRING=$1
arr=(${QUERY_STRING//[=&]/ })
sshpass -p root ssh -tt -o StrictHostKeyChecking=no root@${arr[1]}
