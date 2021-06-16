# CWRC-GitServer

FROM node:16.2.0

WORKDIR /apps/CWRC-GitServer

RUN npm install pm2 -g

COPY . .

RUN npm install

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000
