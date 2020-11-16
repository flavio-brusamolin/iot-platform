FROM node:12.18.4

WORKDIR /usr/src/app/web

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
