FROM node:20 AS base

# Install Playwright browser dependencies
RUN npx playwright install-deps chromium firefox

USER node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .

RUN yarn install --loglevel=warn
