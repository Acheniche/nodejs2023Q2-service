FROM node:21-alpine AS development

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=development --legacy-peer-deps
RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps
RUN npm i -g @nestjs/cli

COPY --from=development /user/src/app/dist ./dist

COPY --from=development /user/src/app/doc ./doc

CMD ["node", "dist/main"]
