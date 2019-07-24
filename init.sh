#!/bin/bash

cd $( dirname "$BASH_SOURCE" )

echo -e "\n---> Init front\n"

cd ./front && npm i; cd ..

echo -e "\n---> Init back\n"

cd ./back && npm i; cd ..
