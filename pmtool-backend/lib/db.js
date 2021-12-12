let dbParams = {};

if (process.env.DATABASE_URL) {
    dbParams.connectionString = process.env.DATABASE_URL;
} else {
    dbParams = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

    };
}

const { pool } = require("pg");
const db = new pool(dbParams);
db.connect(() => {
    console.log(`db is connected via port: ${dbParams['port']}`);
});

module.exports = db;