FROM node:12.18.4

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

WORKDIR /usr/src/app/api

COPY package*.json ./
RUN npm install

COPY src ./src
