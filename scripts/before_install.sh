curl -sL https://rpm.nodesource.com/setup_lts.x | bash -
yum install nodejs -y

npm install -g pm2
pm2 update

cd /home/ec2-user
rm -rf node