#!/bin/bash

echo "starting webpack building"
# cp ./.env.production ./.env
npm run build_prod
echo "start production"
npm run start_prod
