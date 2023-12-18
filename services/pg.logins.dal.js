const dal = require("./auth_db");
const DEBUG = true;
//get all logins.
var getLogins = function() {
    if (DEBUG) console.log("logins.pg.dal.getLogins()");
    return new Promise(function(resolve, reject) {
        const sql = `SELECT id, username, password FROM public."Logins" \
        ORDER BY id DESC LIMIT 7;`
        dal.query(sql, [], (err, result) => {
            if (err) {
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

var getLoginByLoginId = function(id) {
    if (DEBUG) console.log("logins.pg.dal.getLoginByLoginId()");
    return new Promise(function(resolve, reject) {
        const sql = `SELECT id, username, password FROM public."Logins" WHERE id = $1`;
        dal.query(sql, [id], (err, result) => {
            if (err) {
                // logging should go here
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

var addLogin = function(username, password) {
    if (DEBUG) console.log("logins.pg.dal.addLogin()");
    return new Promise(function(resolve, reject) {
        const sql = `INSERT INTO public."Logins"(username, password) \
        VALUES ($1, $2);`;
        dal.query(sql, [username, password], (err, result) => {
            if (err) {
                if (DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

var patchLogin = function(id, username, password) {
    if (DEBUG) console.log("logins.pg.dal.patchLogin()");
    return new Promise(function(resolve, reject) {
        const sql = `UPDATE public."Logins" SET username=$2, password=$3 WHERE id=$1;`;
        dal.query(sql, [id, username, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

var deleteLogin = function(id) {
    if (DEBUG) console.log("logins.pg.dal.deleteLogin()");
    return new Promise(function(resolve, reject) {
        const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
        dal.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

module.exports = {
    getLogins,
    getLoginByLoginId,
    addLogin,
    deleteLogin,
    patchLogin,
}