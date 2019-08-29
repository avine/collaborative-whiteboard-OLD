FROM node:10

WORKDIR /app

COPY ./package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build \
  && npm prune --production \
  && mv ./node_modules ./dist

WORKDIR /app/dist
