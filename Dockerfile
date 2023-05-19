FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev/

# Bundle app source
COPY ./backend/build .

EXPOSE 80
CMD [ "node", "server.js" ]
# Not completely working