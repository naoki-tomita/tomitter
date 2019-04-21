
docker run \
  --name mysql \
  --rm \
  -p 3306:3306 \
  -p 33060:33060 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=link \
  -e MYSQL_USER=link \
  -e MYSQL_PASSWORD=link \
  -v $PWD/data:/var/lib/mysql \
  mysql

          
