FROM node:10.15.3-alpine

RUN apk --no-cache update && \
    apk --no-cache upgrade

WORKDIR /app

COPY package.json package.json

RUN yarn install && \
    yarn cache clean

RUN chown -R node:node /app

USER node

COPY . .

CMD ["npm", "start"]
