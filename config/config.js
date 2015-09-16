module.exports = {

    "development": {
        "username": process.env.sqlUsername || "root",
        "password": process.env.sqlPassword ||  null,
        "database": process.env.sqlDatabase || "myhealth",
        "host": process.env.sqlHost || "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "myhealth",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "myhealth",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }

};