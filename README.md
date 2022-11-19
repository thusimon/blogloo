# local
- docker image ls
- docker image prune -a
- docker build -t blogloo-server .
- docker-compose build
- docker-compose up -d
- docker-compose stop
- docker-compose -f docker-compose.yml up
- docker exec -it \<container-ID\> sh
- mysql -usa -p
- sudo service docker start
- sudo service redis-server restart

# aws
- ssh -i lu-dev-key.pem ec2-user@\<ec2-public-ip\>
- scp -r -i lu-dev-key.pem ./target/blogloo-0.0.1-SNAPSHOT.jar ec2-user@\<ec2-public-ip\>:~/apps/blogloo/target
- sudo yum update
## docker
### install
- sudo amazon-linux-extras install docker
- sudo service docker start
- sudo usermod -a -G docker ec2-user
- sudo chkconfig docker on #autostart
- sudo reboot
### docker-compose install
- sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
- sudo chmod +x /usr/local/bin/docker-compose
- docker-compose version
## nginx
### install
- sudo yum clean metadata
- sudo yum -y install nginx
- nginx -v
- sudo systemctl start nginx.service
### config
- sudo nginx -t
- sudo nginx -s quit
- sudo nginx -s reload
- ps -ax | grep nginx
## SSL config
- 
