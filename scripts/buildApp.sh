#!/bin/bash


echo "cleaning project"

npm run clean:app

echo "building frontend"
cd frontend || exit


npm run build:frontend

cd ..

echo "copying frontend build to backend..."

mkdir backend/src/static/

cp -r frontend/dist backend/src/static/

echo "Building backend"

cd backend || exit
npm run build:backend

echo "Copying other files to build"


cd ..

cp -r backend/src/static backend/build/static

#cp backend/src/.env backend/build

echo "Build complete"
