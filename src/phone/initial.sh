#!/bin/bash

echo "starting..."
# file will be copied to project root, when container up
# TODO: use link instead of cp
# rm -frd /app/node_modules
# cp -r /node_resources/node_modules /app
# cp -r /node_resources/yarn.lock /app/yarn.lock
# sudo chmod -R 777 node_modules/
# chown -R root:root /app/node_modules

if [ $NODE_ENV == "production" ]; then
  # yarn install --production
  rm -f /app/.env
  cp /app/production.env /app/.env
  echo "start production"
  npm run start_prod
else
  yarn install
  rm -f /app/.env
  cp /app/development.env /app/.env
  echo "start development"
  npm start
fi
