docker run --rm --name redis -p 6379:6379 -v $PWD:/data redis redis-server --appendonly yes
