## useful commands
- docker build -t blogloo-server .
- docker-compose build
- docker-compose -f docker-compose.yml up
- docker-compose stop
- docker exec -it <container-ID> sh
- mysql -usa -p
- sudo service docker start
- sudo service redis-server restart

## aws commands
- ssh -i lu-dev-key.pem ec2-user@<ec2-public-ip>
- scp -r -i lu-dev-key.pem ./target/blogloo-0.0.1-SNAPSHOT.jar ec2-user@<ec2-public-ip>:~/apps/blogloo/target
