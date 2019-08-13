FROM node:10-alpine AS build

WORKDIR /app
COPY ./package*.json ./
RUN npm install && npm cache clean --force

ARG baseHref=/

COPY . .
RUN npm run build -- --prod --base-href=${baseHref}

FROM nginx:latest AS dist

WORKDIR /tmp
COPY ./nginx.conf ./
RUN cat nginx.conf > /etc/nginx/conf.d/default.conf

WORKDIR /app/${baseHref}
COPY --from=build /app/dist/showcase ./
