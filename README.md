# DA-IICT Elections React App

Web App for the DA-IICT Elections built on ReactJS for the STV system of voting.

## For Development

- The frontend uses the api's from the following repo - https://github.com/gauravsofat/elections-api

- Clone the repo and move to repo folder using the following commands:

  ```bash
  git clone https://github.com/shadxx7/elections-frontend.git
  cd elections-frontend
  ```

- Please also clone the api repo:

  ```bash
  git clone https://github.com/gauravsofat/elections-api.git
  cd elections-api
  ```

### To run the react app

- You need Node & Yarn to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

- You will need to set the API url in the .env.development file to the url you are hosting the api on. By default it is set to http://localhost:5000/

- Run the following commands in the directory of elections-api:

  ```bash
  yarn
  yarn start
  ```

- Run the following commands in the directory of elections-frontend:

  ```bash
  yarn
  yarn start
  ```

- Now go on http://localhost:3000/ in a browser to see the app.

# License

This project is licensed under the MIT License - Copyright (c) 2018 Mohamed Shadab
