FROM node:16-alpine AS base

USER node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn install --loglevel=warn
