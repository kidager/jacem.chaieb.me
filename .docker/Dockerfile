FROM node:20-alpine AS base

USER node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn install --loglevel=warn
