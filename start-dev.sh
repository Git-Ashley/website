# client is dependent on api
sudo docker compose -f ./docker-compose-dev.yml stop client 

sudo docker compose -f ./docker-compose-dev.yml stop api

sudo docker compose -f ./docker-compose-dev.yml up --detach --build --force-recreate api 
sudo docker compose -f ./docker-compose-dev.yml up --detach --build --force-recreate client
