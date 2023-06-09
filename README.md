# Mern Example

This is a completed example template of a MERN stack template. 
It is complete with a seeded MongoDB, Node Express backend, and React frontend (using Vite) and linter.

# Tech Needed #
- Node.js
- IDE
- Postman (Optional For testing API endpoints)
- Docker (Recommended)




# Getting the application running #

## Backend Environment Variables ##
- this backend is set up to use environment variables to log into the database, the .env file is not to be committed to a git repository because it contains sensitive information
- I am including the following comment as an example, real username and password would normally not be committed to the repository
- before starting the app create a file named `.env` in the backend/src folder
- copy the following text block into the file
```
SEED_DB=true
MONGODB_USERNAME=admin
MONGODB_PASSWORD=admin
MONGODB_DB=local
MONGODB_URI=localhost
MONGODB_PORT=27017

MONGODB_TABLE=todos
MONGODB_AUTHSOURCE=admin

MONOLITH=true
```



## Setup ##

### Docker ###
1. install docker https://docs.docker.com/engine/install/
2. must create an account on https://hub.docker.com/
3. through terminal/cmd run `docker login` and login with username and password
4. run `docker pull mongo` - you should now see the image in docker desktop under 'images' tab

### #Node JS  ###
- https://nodejs.org/en/download


## Getting Application Running - Monlothic ##
- `npm install` to install all application dependencies for both frontend and backend. This will create a file named `node_modules` in your root folder.
  - node_modules are not to be commited to git, they are downloaded from public repositories on a per-use basis
  - once you run `npm install` you should not have to do this again unless
    1. You deleted the `node_modules` directory
    2. A new dependency is added to the package.json
- run `npm run start:app` - this command will not work if you do not have docker installed and are logged into your docker hub account as it assumes mongo db is running in a container.
  - this command will build the application
  - copy the static resources (aka front end code) to the backend/src/static directory
  - start mongodb in docker
  - start the backend api, which is also serving the frontend
  - seed the db with some dummy data
- should start on `localhost:80`

## Microservices ##

- set `MONOLITH=false`

### Database ###
- to run mongodb with docker
1. run `docker pull mongo` - you should now see the image in docker desktop under 'images' tab
2. to start the container run: `docker-compose up --build -d mongodb`  from root directory, this should start your mongodb container

### Backend ###
**assumes already ran npm i**
- Starting node.js backend running express.js and using mongoose to connect to mongodb
1. run `npm run start:backend`, this will start the sever and seed the db
2. visit: http://localhost:8080/api/todos

### FrontEnd ###
**node modules for frontend install in the root folder with the initial `npm install`
1. `npm run start:frontend`
2. navigate to `http://localhost:5713`, on click of the get todos button an api call is made to the backend, which gets all the todos from the db
3. Checkboxes are toggled with react state


### Linting ###
- can lint the whole project from the root folder
- or can lint each piece individually from their respective folders - see `package.json` (s)

# Other Notes #
- can run frontend and backend as well as lint them from root or their respective folders.
- possible testing frameworks:
  - react testing library : frontend react app - https://testing-library.com/docs/react-testing-library/intro/
  - mocha: backend node api - https://mochajs.org/
  - cypress: integration - https://www.cypress.io/

# Running Whole App In Docker #
- not completely working
- from root run `docker build -t example-app .`
- `docker run -p 80:80 --name example-app --env-file ./docker.env`



## Current Files  - has to be updated##

### Root ###
- .gitignore # files to not include in git
- build.sh # builds the frontend and copies it to the backend/static folder, builds backend and configures app for copying into docker image
- docker-compose.yaml # mongodb configuration
- package.json # holds npm scripts and dependencies
- package-lock.json # auto generated when running `npm install`

### Backend ###
- server.js # express server configuration
- api.js # api routes for CRUD operations in MONGODB
- dbSetup.js # connects and seeds database 
- .env # environment variable file
- package.json # holds backend specific commands
- controllers/ # holds files for all api routes to listen on
- services/ # holds files that talk to the database - called by the controllers

### Frontend ###
- setup with `npm create vite@latest frontend --template react`
- most files auto generated, will comment on the important ones
- index.html # has compiled javascript injected into it
- /src # holds all react code that will be injected into index.html
- /src/main.jsx # auto generated, used for react DOM configuration, renders the App component
- /src/app.jsx # Actual component that holds what is see when navigate to 'http://localhost:5713'



## Setup linting from scratch ##
- `npm install eslint eslint-config-prettier prettier –-save-dev`
- `eslint --init`



## General Thoughts/TODOS ##
- introduce MUI for react?
- standardize linting across the app
- containerize

