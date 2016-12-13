rm -fr node_modules react-native-packager-cache-* haste-map-react-native-packager-* react-native-packager-*
cp -r /node_resources/node_modules /app
chmod -rx node_modules/
npm install --quiet
npm run start
