ARG DISTRO=node:13-alpine

FROM $DISTRO as builder

# for some npm packages to be able to build natively
# we need node-gyp
# see https://github.com/nodejs/docker-node/issues/282
RUN apk add --no-cache --virtual .gyp python make

WORKDIR /usr/src/app

COPY package*.json yarn*.lock ./

# RUN npm ci
RUN yarn install --frozen-lockfile

FROM $DISTRO as deploy

ENV MAILER_PORT=3020

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ ./

COPY . .

EXPOSE $MAILER_PORT

CMD [ "node", "bin/www" ]
