FROM node:21-alpine AS development

WORKDIR /user/src/app

COPY package.json package-lock.json ./

RUN npm install --only=development --legacy-peer-deps

COPY ./src .
