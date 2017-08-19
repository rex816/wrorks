#!/bin/bash

foreverPath=$(cd "$(dirname "$0")"; pwd)

PID=`cat $foreverPath/forever.pid`

forever stop $PID
