# Blogloo
Blogloo is a personal blog spring boot app, allowing CRUD operations of articles, the frontend is using react.

# Installation
- `mvn install`
- go to `web-client` directory, run `yarn install`

# Development
- install mysql locally
- install redis locally
- Open the project in intellij, and directly run the `BloglooApplication` class, the app should start on `localhost:8080`

# Dockerize
- please adjust the `spring.datasource.url` and `spring.redis.host` in `application.properties` to use the docker service url
- `mvn clean install`
- `docker-compose build`
- `docker-compose up`

# Demo
<a href="https://blogloo.utticus.com/" target="_blank">https://blogloo.utticus.com</a>
