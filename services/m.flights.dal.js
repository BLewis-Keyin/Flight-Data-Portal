const { ObjectId } = require("mongodb");
const mdb = require("./mdb");


async function getFlights() {
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