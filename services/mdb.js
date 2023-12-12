const { MongoClient } = require('mongodb');

// const uri = "mongodb://127.0.0.1:27017/";
const atlas = "mongodb+srv://peterrawsthorne:DsHwaloakVCgxc9Y@cluster0.4tdayfm.mongodb.net/"

// const pool = new MongoClient(uri);
const pool = new MongoClient(atlas);

module.exports = pool;