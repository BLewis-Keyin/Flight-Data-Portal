const dal = require("./flights_db.js");

const DEBUG = false;

const getFlights = function() {
    if (global.DEBUG || global.DAL_DEBUG || DEBUG) console.log("flights.pg.dal.getFlights()");
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM flights";
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


module.exports = {
    searchFlights,
    getFlights,
    getFlightById,
    getFlightsByStatus,
};