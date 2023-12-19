var router = require('express').Router();
const loginsDal = require('../../services/pg.logins.dal')
const bcrypt = require('bcrypt');

// api/logins
router.get('/', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/logins/ GET ' + req.url);
    try {
        let theLogins = await loginsDal.getLogins();
        res.json(theLogins);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});
// api/logins/:id
router.get('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/logins/:id GET ' + req.url);
    try {
        let aLogin = await loginsDal.getLoginByLoginId(req.params.id);
        if (aLogin.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({ message: "Not Found", status: 404 });
        } else
            res.json(aLogin);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});
router.post('/', async(req, res) => {
    if (DEBUG) {
        console.log('ROUTE: /api/logins/ POST');
        //    console.log(req);
    }
    try {
        await loginsDal.addLogin(req.body.username, req.body.password);
        res.statusCode = 201;
        res.json({ message: "Created", status: 201 });
    } catch {
        console.log("ERROR: " + err);
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});
router.patch('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/logins PATCH ' + req.params.id);
    try {
        await loginsDal.patchLogin(req.params.id, req.body.username, req.body.password);
        res.statusCode = 200;
        res.json({ message: "OK", status: 200 });
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});
router.delete('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/logins DELETE ' + req.params.id);
    try {
        await loginsDal.deleteLogin(req.params.id);
        res.statusCode = 200;
        res.json({ message: "OK", status: 200 });
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});



router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginsDal.getLoginByUsername(username);

        if (!user || !user.length) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const hashedPassword = user[0].password;
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err || !result) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json({ message: 'Login successful' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;