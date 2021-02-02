FROM node:14.15.4-buster-slim

WORKDIR /app

ENV DATABASE_URL="postgresql://root:password@postgres:5432/easter_api?schema=public"

RUN apt-get -qy update
RUN apt-get -qy install openssl

COPY package.json /app
COPY yarn.lock /app
COPY nodemon.json /app
COPY prisma /app/prisma

RUN npm install -g typescript

RUN yarn install

COPY . /app

CMD ["yarn", "start:docker"]