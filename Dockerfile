FROM node:14.15.4-buster-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm install -g typescript

RUN npm run build

CMD ["npm", "run", "start:prod"]