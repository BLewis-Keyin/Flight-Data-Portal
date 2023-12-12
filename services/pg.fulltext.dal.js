const dal = require("./dvdrental_db");

var getFullText = function(text) {
  if(DEBUG) console.log("pg.dal.getFullText()");
  return new Promise(function(resolve, reject) {
     const sql = `SELECT title, description FROM film \
        WHERE description LIKE '%'||$1||'%' \
        OR title LIKE '%'||$1||'%'`;
    if(DEBUG) console.log(sql);
    dal.query(sql, [text], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
    getFullText,
}