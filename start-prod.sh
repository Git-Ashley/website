# client is dependent on api
sudo docker compose stop client

sudo docker compose up --build --force-recreate client
