#!/bin/bash

cd $( dirname "$BASH_SOURCE" )

./init.sh && ./build.sh && ./start.sh
