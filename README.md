
<p align="center">
  <img width="250" src="https://avatars0.githubusercontent.com/u/44930156?s=200&v=4" alt="nadle logo">
</p>


# Supporting Nadle API

This quick start guide will teach you how to get up and running with the naddle API. This projects includes de following modules:

* [NodeJS](https://nodejs.org/en/) with [Express](https://expressjs.com/)
* [Docker](https://www.docker.com/) files required for virtualizing the necessary dependencies
* [Prisma](), as ower ORM, this sets it self up automatically with the `docker-compose.yml` file and also creates a [Postgres](https://www.postgresql.org/) database for us.
* [Graphql-yoga](https://github.com/prisma/graphql-yoga) server to comunicate with our clients in a secure manner.

Keep in mind that this project was built with [yarn](https://yarnpkg.com/en/), but you can feel free to use any other package management solution you prefer.

## For development

If you wish to play with our api, we recommend that you follow the next guidelines so can run it successfully.

### Install Docker
To install docker follow the official documentation at https://docs.docker.com/install/

### Install Prisma
* With homebrew
```sh
brew tap prisma/prisma
brew install prisma
```
* With NPM or Yarn
```sh
npm install -g prisma
# or
yarn global add prisma
```
### Run migrations
Since we are using prisma this could be done by running:
```sh
docker-compose up -d # This will start our prisma server and databse
prisma deploy # This will create and run the necessary migrations
```