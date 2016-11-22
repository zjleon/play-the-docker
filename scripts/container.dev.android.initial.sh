# node modules will be copied to /app, when container up
cp -r /node_packages/node_modules ./node_modules
npm install --quiet
npm run dev:start_packager &
gradle tasks --info
