FROM alpine:latest
RUN apk update && apk add --no-cache nginx

ADD default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /run/nginx

CMD nginx -g "daemon off;"
