FROM node:10-alpine

WORKDIR /front
COPY ./front/package*.json ./
RUN npm install && npm cache clean --force

WORKDIR /back
COPY ./back/package*.json ./
RUN npm install && npm cache clean --force

WORKDIR /front
COPY /front .
RUN npm run build

WORKDIR /back
COPY /back .
RUN npm run build \
  && npm prune --production \
  && mv ./node_modules ./dist

WORKDIR /app/static
WORKDIR /app
RUN mv ../back/dist/** . \
  && mv ../front/dist/showcase/** ./static

RUN rm -rf ../front ../back

EXPOSE 3000

CMD ["node", "index"]
