# CWRC-GitServer

FROM node:14.5.0

WORKDIR /apps/CWRC-GitServer

RUN npm install pm2 -g

COPY . .

RUN npm install

# CMD ["pm2", "start", "./bin/www", "--no-daemon"]
CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000
