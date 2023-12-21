const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '24.137.80.247',
    database: 'auth',
    password: 'bl1994',
    port: 5434,
});
module.exports = pool;