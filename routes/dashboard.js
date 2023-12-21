const express = require('express');
const router = express.Router();

const DEBUG = false;

// check if the user is authenticated else redirect to login
const isAuthenticated = (req, res, next) => {

    if (req.session && req.session.user) {
        if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) {
            console.log({ user: req.session.user }, ': isAuthenticated');
        }
        return next();
    } else {
        res.redirect('/login');
        if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) {
            console.log({ user: req.session.user }, ': NotAuthenticated');
        }
    }
};


router.get('/', isAuthenticated, (req, res) => {
    if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) {
        console.log('ROUTE: /dashboard');
    }
    const user = req.session.user;
    res.render('dashboard', { user });
});

router.get('/logout', (req, res) => {
    if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) {
        console.log('ROUTE: /dashboard/logout');
    }
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;