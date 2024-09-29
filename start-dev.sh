# client is dependent on api
sudo docker compose -f ./docker-compose-dev.yml stop client

cd client-2016/
npm run build
cd ../

sudo docker compose -f ./docker-compose-dev.yml up --build --force-recreate client