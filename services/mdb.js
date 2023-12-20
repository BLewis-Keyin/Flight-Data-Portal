const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/";
const pool = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await pool.connect();
        console.log('Connected to the MongoDB database');
        return pool.db("demo");
    } catch (error) {
        console.error('Error connecting to the MongoDB database:', error);
        throw error;
    }
}
module.exports = {
    pool,
    connectToDatabase,
};