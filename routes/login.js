const express = require('express');
const router = express.Router();
const loginsDal = require('../services/pg.logins.dal')
const bcrypt = require('bcrypt');

const DEBUG = false;

router.get('/', async(req, res) => {

    try {
        let theLogins = await loginsDal.getLogins();
        if (DEBUG || global.ROUTE_DEBUG || global.DEBUG) console.table(theLogins);
        res.render('login.ejs');
    } catch {
        res.render('503');
    }
});

router.post('/', async(req, res) => {
    if (DEBUG || global.ROUTE_DEBUG || global.DEBUG) console.log("login.POST");
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await loginsDal.getLoginByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { username };
            res.redirect('/dashboard');
        } else {
            res.redirect('/login?error=Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.render('/login', { error: 'Error during login' });
    }
});

module.exports = router