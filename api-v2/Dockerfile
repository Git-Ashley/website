FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4435

CMD ["node", "index.js"]
