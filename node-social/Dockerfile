FROM alpine:latest

# Install glibc and required dependencies
RUN apk add --no-cache libstdc++
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-bin-2.35-r0.apk
RUN apk --no-cache --force-overwrite add glibc-2.35-r0.apk glibc-bin-2.35-r0.apk

COPY ./dist/node-social /usr/local/bin/node-social
RUN chmod +x /usr/local/bin/node-social

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["node-social"]


#docker build -t node-social:latest .
#docker run -p 80:80 --rm node-social:latest   <--- for testing

#docker tag node-social:latest ashleyp1621/node-social:latest
#docker login
#docker push ashleyp1621/node-social:latest
