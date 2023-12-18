const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '24.137.80.247',
    database: 'demo',
    password: 'admin',
    port: 5434,
});

module.exports = pool;