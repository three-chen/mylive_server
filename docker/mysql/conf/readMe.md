<!-- docker运行mysql命令 -->
docker run -p 3306:3306 --name mysql -v $PWD/conf/my.cnf:/etc/my.cnf -e MYSQL_ROOT_PASSWORD=123456 -d mysql