const dal = require("./auth_db");

const DEBUG = true;
//get all users.
var getUsers = function() {
    if (DEBUG) console.log("users.pg.dal.getUsers()");
    return new Promise(function(resolve, reject) {
        const sql = `SELECT user_id, first_name, middle_name, last_name, email, username \
        FROM public."Users" \
        ORDER BY user_id DESC LIMIT 7;`
        dal.query(sql, [], (err, result) => {
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

var getUserById = function(id) {
    if (DEBUG) console.log("users.pg.dal.getUserById()");
    return new Promise(function(resolve, reject) {
        const sql = `SELECT user_id, first_name, middle_name, last_name, email, username \
       FROM public."Users" WHERE user_id = $1`;
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
    getUsers,
    getUserById,
    addLogin,
    deleteLogin,
    patchLogin,
}