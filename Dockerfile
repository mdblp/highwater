FROM node:10.15.3-alpine

ARG npm_token
ENV nexus_token=$npm_token

RUN apk --no-cache update && \
    apk --no-cache upgrade

WORKDIR /app

COPY package.json package.json
COPY .npmrc .npmrc

RUN npm install

RUN chown -R node:node /app

USER node

COPY . .

CMD ["npm", "start"]
