#!/bin/bash

foreverPath=$(cd "$(dirname "$0")"; pwd)

export LOGS_DIR=$foreverPath/logs
export PID=$foreverPath/forever.pid
export APP_PATH=$(cd "$(dirname $foreverPath)"; pwd)
export APP=dist/server.js

if [ ! -d "$LOGS_DIR" ]
then
    mkdir "$LOGS_DIR"
fi

nodeEnv=production
if [ x$1 = 'x--dev' ]
then
    nodeEnv=development
fi

echo "NODE_EVN=$nodeEnv"
NODE_ENV=$nodeEnv forever --sourceDir $APP_PATH -p $APP_PATH -l $LOGS_DIR/access.log -e $LOGS_DIR/error.log -o $LOGS_DIR/out.log -a --pidFile $PID start $APP
