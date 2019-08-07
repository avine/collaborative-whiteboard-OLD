#!/bin/bash

function log {
  echo -e "\033[35m\n---> $1\n\033[0m"
}

cd $( dirname "$BASH_SOURCE" ) && cd ..

rm -rf ./output
mkdir -p ./output/static

log "Build front"

npm run --prefix ./front build
mv ./front/dist/showcase/* ./output/static

log "Build back"

npm run --prefix ./back build
mv ./back/dist/* ./output

log "Install back dependencies"

cp ./back/package.json ./output
npm --prefix ./output install --only=production

log "Build completes!"
