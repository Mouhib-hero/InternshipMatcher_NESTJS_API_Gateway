FROM node:16.17.1-alpine
RUN apk add git 
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN npm install -g npm@8.15.0
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run proto:install
RUN adduser -D myuser
RUN chown -R myuser: /var/www/gateway
USER myuser 
ENTRYPOINT nest start
