# CWRC-GitServer

FROM node:14.15.4

WORKDIR /apps/CWRC-GitServer

RUN npm install pm2 -g

COPY . .

RUN npm install

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000
