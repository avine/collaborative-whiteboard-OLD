FROM node:10-alpine AS build

WORKDIR /app
COPY ./package*.json ./
RUN npm install && npm cache clean --force

ARG baseHref=/

COPY . .
RUN npm run build -- --prod --base-href=${baseHref}

FROM nginx:stable AS dist

WORKDIR /tmp
COPY ./nginx.conf ./
RUN cat nginx.conf > /etc/nginx/conf.d/default.conf

ARG baseHref=/

# TODO: if baseHref is not "/" then from root add redirect 301 to "baseHref" directory

WORKDIR /app/${baseHref}
COPY --from=build /app/dist/showcase ./
