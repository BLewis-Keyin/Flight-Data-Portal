var router = require('express').Router();
const usersDal = require('../../services/pg.users.dal')

// api/users
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/users/ GET ' + req.url);
    try {
        let theUsers = await usersDal.getUsers(); 
        res.json(theUsers);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

// api/users/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/users/:id GET ' + req.url);
    try {
        let aUser = await usersDal.getUserById(req.params.id); 
        if (aUser.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(aUser);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
  });

module.exports = router;