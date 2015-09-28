# Webservice

Webservice made in Node.js for project MyHealth. The API is publicly accessible at [https://myhealth-hanze.herokuapp.com](https://myhealth-hanze.herokuapp.com)

To see all the API endpoints, visit the wiki at [https://github.com/MyHealthHanze/Webservice/wiki/API-endpoints](https://github.com/MyHealthHanze/Webservice/wiki/API-endpoints)

## Installation
* Install [Node.js](https://nodejs.org/) and MySQL or MariaDB
* Clone this repository
* Install the dependencies by running ```npm install```
* Install Sequelize CLI and Nodemon globally by running ```npm install -g sequelize-cli nodemon``` 
* Create a database named _myhealth_
* Tweak the ```config/config.json``` and/or ```config/settings.js``` if necessary
* Run the application by running the ```npm run watch``` command
* Visit [http://localhost:1337/api/v1/](http://localhost:1337/api/v1/) to connect with the base API

## Testing
* The tests are located in the ```test``` folder
* Install Mocha globally with ```npm install -g mocha```
* You can run the tests with the ```npm test``` command
