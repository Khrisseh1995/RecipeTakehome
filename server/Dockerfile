FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000

# Stall until mongo starts up
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node index.js