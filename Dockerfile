FROM node:16.8-alpine

WORKDIR /user/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm","start" ]
