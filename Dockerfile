FROM node:10.4.1-alpine as build

LABEL maintainer="Heroqu <hero.qub@gmail.com>"

# see https://github.com/nodejs/docker-node/issues/282
# RUN apk add --no-cache --virtual .gyp python make g++
RUN apk add --no-cache --virtual .gyp python make

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN apk del .gyp

FROM node:10.4.1-alpine as deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

COPY src .

EXPOSE 3020

CMD [ "node", "bin/www" ]
