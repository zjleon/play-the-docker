# file will be copied to project root, when container up
cp -r /node_resources/node_modules /app
chmod -rx node_modules/
npm install --quiet
npm run start
