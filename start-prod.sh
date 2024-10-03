# client is dependent on api
sudo docker compose stop client

#cd client-2016/
#npm run build
#cd ../

sudo docker compose up --build --force-recreate client
