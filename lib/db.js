let dbParams = {};

if (process.env.DATABASE_URL) {
    dbParams.connectionString = process.env.DATABASE_URL;
} else {
    dbParams = {
        host: 'localhost',
        port: '5432',
        user: 'matthewfreeman',
        password: '123',
        database: 'pmtool',

    };
}

const { Pool } = require("pg");
const db = new Pool(dbParams);
db.connect(() => {
    console.log(`db is connected via port: ${dbParams['port']}`);
});

module.exports = db;