docker build -t node-social:latest .
docker tag node-social:latest ashleyp1621/node-social:latest
docker login
docker push ashleyp1621/node-social:latest
