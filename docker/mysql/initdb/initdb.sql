 -- 创建一个名为 live_server 的数据库
 CREATE DATABASE IF NOT EXISTS mylive_server;
 -- 允许 root 用户远程连接数据库
 ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
 FLUSH PRIVILEGES;