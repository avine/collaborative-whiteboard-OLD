#!/bin/bash

cd $( dirname "$BASH_SOURCE" )

rm -rf ./output
mkdir -p ./output/static

echo -e "\n---> Build front"

npm run --prefix ./front build
mv ./front/dist/showcase/* ./output/static

echo -e "\n---> Build back"

npm run --prefix ./back build
mv ./back/dist/* ./output

echo -e "\n---> Install back dependencies"

cp ./back/package.json ./output
cd ./output && npm i --production; cd ..

echo -e "\nBuild completes!\n"
