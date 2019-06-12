FROM node:6.10.3-alpine

RUN apk --no-cache update && \
    apk --no-cache upgrade

WORKDIR /app

COPY package.json package.json

RUN yarn install && \
    yarn cache clean

RUN chown -R node:node /app \
    && chmod -R 777 /app

USER node

COPY . .

CMD ["npm", "start"]
