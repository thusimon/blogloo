FROM openjdk:17
WORKDIR /blogloo
ADD target/blogloo-0.0.1-SNAPSHOT.jar blogloo-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "blogloo-0.0.1-SNAPSHOT.jar"]
