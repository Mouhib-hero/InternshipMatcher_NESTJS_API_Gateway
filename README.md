NestJS | Microservices | gRPC | API Gateway | seperate databases

API Gateway service for the InternshipMatcher project

## Description
InternshipMatcher is a web application backend that matches students with copmanies offering end of studies internships

Key words: NestJS , Microservices , gRPC , API Gateway , seperate databases.

## Useful links

you can find the rest of the services here:

[https://github.com/mpoyd/InternshipMatcher_NESTJS_gRPC_AUTH](https://github.com/mpoyd/InternshipMatcher_NESTJS_gRPC_AUTH) :Authentification microservice

[https://github.com/ayadi-mohamed/InternshipMatcher_NESTJS_gRPC_APPLICATION](https://github.com/ayadi-mohamed/InternshipMatcher_NESTJS_gRPC_APPLICATION) :Application microservice

[https://github.com/Souha-LOULOU/InternshipMatcher_NESTJS_gRPC_OFFER](https://github.com/Souha-LOULOU/InternshipMatcher_NESTJS_gRPC_OFFER) :Offer microservice

[https://github.com/Mouhib-hero/InternshipMatcher_NESTJS_API_Gateway](https://github.com/Mouhib-hero/InternshipMatcher_NESTJS_API_Gateway) :API Gateway

[https://github.com/ayadi-mohamed/grpc-nest-proto](https://github.com/ayadi-mohamed/grpc-nest-proto) :Shared Proto Repository


## Microservices Design
![image](https://i.ibb.co/WHTySCg/design.png)

```bash
Authentification microservice: Handles the Register and Login process
Offer microservice : Employers can offer internships
Application microservice : Students can search and apply for internships
API Gateway : Handles all the API calls and sits between all the services and the client to ensure and provide a secured and organized API-based integrations.
```

Design Patterns used :

microservices  | 
API GATEWAY  | 
seperate databases 

## Installation
```bash
#### Dependencies
$ npm i @nestjs/microservices @grpc/grpc-js @grpc/proto-loader
$ npm i -D @types/node ts-proto

#### Installing prerequisite and accessing Proto Repository
$ npm install
$ npm run proto:install
```

Design Patterns used :

microservices  | 
API GATEWAY  | 
seperate databases 

## Authors

Mehdi Jerbi  |  
Mohamed Ayadi  |  
Souha Loulou  |  
Mouhib Ben Jemaa

