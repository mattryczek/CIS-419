module.exports = {
    "development": {
      "username": "devuser",
      "password": "northwestern",
      "database": "graphbook_dev",
      "host": "10.10.20.41",
      "dialect": "mysql",
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      }
    },
  
    "production": {
      "host": process.env.host,
      "username": process.env.username,
      "password": process.env.password,
      "database": process.env.database,
      "logging": false,
      "dialect": "mysql",
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      }
    }
  }