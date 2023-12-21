var router = require('express').Router();
const DEBUG = false;
if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) {
    console.log('ROUTE: /api/flights');
    console.log('ROUTE: /api/logins');
    console.log('ROUTE: /api/full');
    console.log('ROUTE: /api/users');
}
// http://localhost:3000/api/flights/
const flightsRouter = require('./flights')
router.use('/actors', flightsRouter);

// http://localhost:3000/api/logins/
const loginsRouter = require('./logins')
router.use('/logins', loginsRouter);


module.exports = router;