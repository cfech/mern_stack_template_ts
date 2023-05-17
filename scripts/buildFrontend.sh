#!/bin/bash

echo "building frontend"
cd frontend || exit

npm run build

cd ..

echo "copying frontend build to backend..."

rm -rf backend/static/
mkdir backend/static/

cp -r frontend/dist backend/static/

echo "Build complete"
