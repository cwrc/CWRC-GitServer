# CWRC-GitServer

FROM node:13.8.0

WORKDIR /apps/CWRC-GitServer

RUN npm install pm2 -g

COPY . .

RUN npm install

CMD ["pm2", "start", "./bin/www", "--no-daemon"]

EXPOSE 3000
