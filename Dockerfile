FROM node:14.15.4-buster-slim

WORKDIR /app

COPY package.json /app

RUN npm install -g typescript

RUN npm install -g yarn

RUN yarn ci

COPY . /app

CMD ["yarn", "start:prod"]