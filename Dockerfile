FROM node:16

WORKDIR /mini-mind-hub

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7000

CMD ["npm", "run", "start"]