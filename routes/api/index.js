var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api/actors');
    console.log('ROUTE: /api/logins');
    console.log('ROUTE: /api/full');
    console.log('ROUTE: /api/users');
}
// http://localhost:3000/api/actors/
const actorsRouter = require('./actors')
router.use('/actors', actorsRouter);

// http://localhost:3000/api/logins/
const loginsRouter = require('./logins')
router.use('/logins', loginsRouter);

// http://localhost:3000/api/full/
const fulltextRouter = require('./fulltext')
router.use('/full', fulltextRouter);

// http://localhost:3000/api/users/
const usersRouter = require('./users')
router.use('/users', usersRouter);

module.exports = router;