<!-- docker运行mysql命令 pwd是项目根目录-->
docker run -p 3306:3306 --name mysql `
    -v "${pwd}/docker/mysql/conf/my.cnf:/etc/my.cnf"`
    -v "${pwd}/docker/mysql/initdb/:/docker-entrypoint-initdb.d/"`
    -v "${pwd}/docker/mysql/data/:/var/lib/mysql"`
    -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0