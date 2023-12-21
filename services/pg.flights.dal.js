const dal = require("./flights_db.js");

const DEBUG = false;

const getFlights = function() {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.getFlights()");
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM flights ORDER BY flight_id ASC";
        dal.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const getFlightById = function(flightId) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.getFlightById()");
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM flights WHERE flight_id = $1";
        dal.query(sql, [flightId], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const getFlightsByStatus = function(flightStatus) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.getFlightsByStatus()");
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM flights WHERE status = $1";
        dal.query(sql, [flightStatus], (err, result) => {
            if (err) {
                console.error(err);
                reject({ error: "Database query failed", details: err });
            } else {
                resolve(result.rows);
            }
        });
    });
};

const searchFlights = function(query) {

    return new Promise((resolve, reject) => {
        if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.searchFlights()");
        const sql = "SELECT * FROM flights WHERE flight_no ILIKE $1 OR arrival_airport ILIKE $1 OR status ILIKE $1";
        dal.query(sql, [`%${query}%`], (err, result) => {
            if (err) {
                console.error(err);
                reject({ error: "Database query failed", details: err });
            } else {
                resolve(result.rows);
            }
        });
    });
};

async function addFlight(flightNumber, destination, departureTime) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.addFlight()");
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO flights (flight_no, arrival_airport, scheduled_departure) VALUES ($1, $2, $3) RETURNING *";
        dal.query(sql, [flightNumber, destination, departureTime], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
}

async function putFlight(flightNumber, arrivalAirport, departureAirport, departureTime, arrivalTime, status, aircraftCode, flightId) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.putFlight()");
    try {
        const sql = "UPDATE flights SET flight_no = $1, arrival_airport = $2, departure_airport = $3, scheduled_departure = $4, scheduled_arrival = $5, status = $6,  aircraft_code = $7 WHERE flight_id = $8 RETURNING *";

        const result = await dal.query(sql, [flightNumber, arrivalAirport, departureAirport, departureTime, arrivalTime, status, aircraftCode, flightId]);
        return result.rows;

    } catch (error) {
        console.error('Error in putFlight:', error);
        throw error;
    }
}

async function patchFlight(id, flightNumber, destination, departureTime) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.patchFlight()");
    return new Promise((resolve, reject) => {
        const sql = "UPDATE flights SET flight_no = $1, arrival_airport = $2, scheduled_departure = $3 WHERE flight_id = $4 RETURNING *";
        dal.query(sql, [flightNumber, destination, departureTime, id], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
}

async function deleteFlight(id) {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.deleteFlight()");
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM flights WHERE flight_id = $1 RETURNING *";
        dal.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
}

module.exports = {
    getFlights,
    getFlightById,
    getFlightsByStatus,
    searchFlights,
    addFlight,
    putFlight,
    patchFlight,
    deleteFlight,
};