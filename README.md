# GraphQL - NodeJS - MongoDB - Express

Blogs Service Project to beef up knowledge in nodeJS and graphql, basic configuration, create queries and mutations, security.

## requirements

- nodejs: v18.14.1
- express
- nodemon
- graphql
- jsonwebtoken
- dotenv: for hide variables
- bcrypt: encryption
- mongoose: intall mongoose and validator

## intall packages

```
npm init
npm install --save express body-parser
npm install --save-dev nodemon
npm install --save express-graphql graphql
npm install mongoose mongoose-unique-validator -E
npm install --save jsonwebtoken
npm install --save dotenv
npm install --save bcrypt
```

## Create container Docker MongoDB and mongo express

in this project view the `docker-compose.yml` file and excecute the next command to buld a docker mongo container.
for more information review [Docker docs](https://docs.docker.com/compose/gettingstarted/)

```
docker compose up
docker image ls
```
