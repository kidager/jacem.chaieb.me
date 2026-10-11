FROM node:26-trixie-slim AS node

FROM ubuntu:26.04 AS base

# Node.js from the official image; it no longer ships yarn (nor corepack)
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN apt-get update \
  && apt-get install -y --no-install-recommends libatomic1 ca-certificates \
  && ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
  && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
  && npm install -g yarn@1

# Same uid as the official node image, so the mounted files keep their owner
RUN usermod -l node -d /home/node -m ubuntu && groupmod -n node ubuntu

# Install Playwright browser dependencies
RUN npx playwright install-deps chromium firefox \
  && rm -rf /var/lib/apt/lists/*

USER node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .

RUN yarn install --loglevel=warn
