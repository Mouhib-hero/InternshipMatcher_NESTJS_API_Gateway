FROM node:16.17.1-alpine
RUN apk add git 
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN npm install -g npm@8.15.0
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm i --save @nestjs/config
RUN npm i @nestjs/microservices @grpc/grpc-js @grpc/proto-loader
RUN npm i -D @types/node ts-proto
RUN npm run proto:install 
#RUN npm run proto:offer
ENTRYPOINT nest start
#RUN npm run build
#CMD ["node", "dist/main.ts"]
