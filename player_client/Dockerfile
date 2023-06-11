# docker file for react app
# build stage
FROM node:12.16.1-alpine as build-stage

WORKDIR /app

COPY package*.json ./

COPY . .

ENTRYPOINT ["yarn", "start"]