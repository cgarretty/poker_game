# docker file for react app
# build stage
FROM node:12.16.1-alpine as build-stage

WORKDIR /app

COPY package*.json ./

# install yarn
RUN npm install -g yarn

COPY . .

ENTRYPOINT ["yarn", "build"]