FROM node:10 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm test -- --watchAll=false && \
  npm run build

FROM node:10 AS deploy

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY deploy/package*.json ./
RUN npm install
COPY --from=build /usr/src/app/build ./build

USER node
EXPOSE 5000
ENTRYPOINT ["./node_modules/.bin/serve", "-s", "build"]
