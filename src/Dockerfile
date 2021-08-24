FROM node:14 as base
WORKDIR /src
COPY package*.json ./
RUN npm istall
COPY . .

FROM base as production
ENV NODE_PATH=./build
RUN npm run build