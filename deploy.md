# local
- docker image ls
- docker image prune -a
- docker system prune -a
- docker stop [container-ID]
- docker build -t blogloo-server .
- docker-compose build
- docker-compose up -d
- docker-compose stop
- docker-compose -f docker-compose.yml up
- docker exec -it [container-ID] sh
- docker stats
- mysql -usa -p
- sudo service docker start
- sudo service redis-server restart

# aws
- ssh -i lu-dev-key.pem [username]@[instance-public-ip]
- scp -r -i lu-dev-key.pem ./target/blogloo-0.0.1-SNAPSHOT.war [username]@[instance-public-ip]:~/apps/blogloo/target
- scp -r -i lu-dev-key.pem ./var/www/html [username]@[instance-public-ip]:/var/www
- sudo yum update
### rpm lock
- cd /var/lib/rpm
- ps -aux | grep rpm
- sudo rpm --rebuilddb
## docker
- Ubuntu: Follow this [link](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04), but still need to run `sudo usermod -a -G docker [user]` and reboot
- AmazonEC2: Follow this [link](https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)
### install
- sudo amazon-linux-extras install docker
- sudo service docker start
- sudo usermod -a -G docker ec2-user
- sudo chkconfig docker on #autostart
- sudo chkconfig docker off
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
- sudo chkconfig nginx on #autostart
- sudo chkconfig nginx off
### config and start
- sudo nginx -t
- sudo nginx -s quit
- sudo nginx -s reload
- ps -ax | grep nginx
- sudo fuser -k 80/tcp
- sudo fuser -k 443/tcp
- sudo service nginx restart
- sudo service nginx status
- sudo service nginx stop
- sudo less /var/log/nginx/error.log
## SSL
### install
- sudo apt install certbot python3-certbot-nginx
- Follow this [link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html#letsencrypt)
### config
Stop nginx server before running certbot
- sudo certbot certonly --standalone --preferred-challenges http -d [domain1] -d [domain2] -d [domain3]
### renew (stop nginx)
- grep CRON /var/log/syslog
- sudo certbot renew
- sudo certbot renew --dry-run
- sudo crontab -e
- add `0 0 1 * * \<absolute_path\>/RenewSSL.sh >> "\<absolute_path\>/logs/$(date +\%Y-\%m-\%d_\%H:\%M).log"`
- sudo systemctl restart crond
## linux
### performance
- top #shift+m
