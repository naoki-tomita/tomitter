docker build -t proxy .
docker run --rm -p 80:80 proxy:latest
