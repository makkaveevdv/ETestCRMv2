const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "rootMAK",
    host: "localhost",
    port: "5432",
    database: "etestcrmdb"
});
if (pool) console.log("Database is connected");

module.exports = pool;