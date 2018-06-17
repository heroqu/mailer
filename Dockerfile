FROM node:10.4.1-alpine as builder

# for some npm packages to be able to build natively
# we need node-gyp
# see https://github.com/nodejs/docker-node/issues/282
RUN apk add --no-cache --virtual .gyp python make

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# no need anymore, as we start a new image anyway
# RUN apk del .gyp

FROM node:10.4.1-alpine as deploy

LABEL maintainer="Heroqu <hero.qub@gmail.com>"

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

ENV GMAILER_PORT=3020

COPY src .

EXPOSE $GMAILER_PORT

CMD [ "node", "bin/www" ]
