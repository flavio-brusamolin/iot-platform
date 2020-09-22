FROM node:12.18.4

WORKDIR /usr/src/app/api

COPY package*.json ./
RUN npm install

COPY src ./src

CMD [ "npm", "run", "dev" ]
