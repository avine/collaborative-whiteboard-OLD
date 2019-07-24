#!/bin/bash

function log {
  echo -e "\033[35m\n---> $1\n\033[0m"
}

cd $( dirname "$BASH_SOURCE" )

log "Start app"

node ./output/index
