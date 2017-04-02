#!/bin/bash

# file will be copied to project root, when container up
cp -r /node_resources/node_modules /app
# sudo chmod -R 777 node_modules/
# chown -R root:root /app/node_modules
npm install --quiet

if [ $NODE_ENV == "production" ]; then
  echo "start production"
  npm run start_prod
else
  echo "start development"
  npm start
fi
