const { ObjectId } = require("mongodb");
const mdb = require("./mdb");

const DEBUG = false;


async function getFlights() {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: getFlights()');
    try {
        const db = await mdb.connectToDatabase();
        const cursor = db.collection("flights").find();
        const results = await cursor.toArray();
        return results;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function getFlightById(id) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: getFlightById()');
    try {
        const db = await mdb.connectToDatabase();
        const result = await db.collection("flights").findOne({ _id: new ObjectId(id) });
        return result ? [result] : [];
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function searchFlights(query) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: searchFlights()');
    try {
        const db = await mdb.connectToDatabase();
        const regex = new RegExp(query, 'i');
        const results = await db.collection("flights").find({
            $or: [
                { flight_no: regex },
                { arrival_airport: regex },
                { status: regex },
            ],
        }).toArray();
        return results;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function addFlight(flightNumber, destination, departureTime) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("DAL: addFlight()");
    try {
        const db = await mdb.connectToDatabase();
        const result = await db.collection("flights").insertOne({
            flightNumber,
            destination,
            departureTime,
        });
        return result.insertedId;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function putFlight(id, flightNumber, destination, departureTime) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: putFlight()');
    try {
        const db = await mdb.connectToDatabase();
        const result = await db.collection("flights").replaceOne({ _id: new ObjectId(id) }, { flightNumber, destination, departureTime });
        return result;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function patchFlight(id, flightNumber, destination, departureTime) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: patchFlight()');
    try {
        const db = await mdb.connectToDatabase();
        const result = await db.collection("flights").updateOne({ _id: new ObjectId(id) }, { $set: { flightNumber, destination, departureTime } }, { upsert: true, returnDocument: 'after' });
        return result;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

async function deleteFlight(id) {
    try {
        if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log('DAL: deleteFlight()');
        const db = await mdb.connectToDatabase();
        const result = await db.collection("flights").deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = {
    getFlights,
    getFlightById,
    searchFlights,
    addFlight,
    putFlight,
    patchFlight,
    deleteFlight,
};