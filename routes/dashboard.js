const express = require('express');
const router = express.Router();

// check if the user is authenticated else redirect to login
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};


router.get('/', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { user });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;