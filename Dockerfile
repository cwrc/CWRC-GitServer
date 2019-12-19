# CWRC-GitServer

FROM node

RUN npm install pm2 -g

WORKDIR /apps/CWRC-GitServer

COPY . .

RUN npm install

EXPOSE 3000
CMD ["pm2", "start", "./bin/www", "--no-daemon"]