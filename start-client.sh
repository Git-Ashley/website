
cd client-2016/
npm run build
cd ..
sudo docker compose -f ./docker-compose-dev.yml stop client 
sudo docker compose -f ./docker-compose-dev.yml up --detach --build --force-recreate client
