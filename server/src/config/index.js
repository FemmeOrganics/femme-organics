
require("dotenv").config()

const config = {
    development: {
        "host": process.env.PG_HOST ?? "localhost",
        "username": process.env.PG_USERNAME ?? "postgres",
        "password": process.env.PG_PASSWORD ?? "admin",
        "database": process.env.PG_DB ?? "organics",
        "port": process.env.PG_PORT,
        "dialect": "postgres",
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    },
   production: {
        "host": process.env.PG_HOST ,
        "username": process.env.PG_USERNAME ,
        "password": process.env.PG_PASSWORD ,
        "database": process.env.PG_DB ,
        "port": process.env.PG_PORT,
        "dialect": "postgres",
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    }
}

module.exports = config