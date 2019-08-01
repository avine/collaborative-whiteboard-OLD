FROM node:lts-alpine

EXPOSE 3000

ENV NODE_ENV production

RUN mkdir /app && chown node:node /app

WORKDIR /app

COPY ./output .

RUN chown -R node:node ./node_modules

USER node

CMD ["node", "/home/app/index"]
