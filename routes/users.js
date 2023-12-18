const express = require('express');
const router = express.Router();
const usersDal = require('../services/pg.users.dal');
const loginsDal = require('../services/pg.logins.dal');
const flightsDal = require('../services/pg.flights.dal');

// /users route
router.get('/users', async (req, res) => {
    const theUsers = [
        {user_id: 1, first_name: 'example', last_name: 'example'},
        {user_id: 3, first_name: 'pat', last_name: 'patson'},
        {user_id: 5, first_name: 'thor', last_name: 'thorson'}
    ];
    try {
        // let userData = await usersDal.getUsers();
        if (DEBUG) console.table(theUsers);
        res.render('users', {theUsers});
    } catch {
        res.render('503');
    }
});

router.get('/users/:id/edit', async (req, res) => {
    if (DEBUG) console.log('user.Edit : ' + req.params.id);
    res.render('userPatch.ejs', {first_name: req.query.first_name, last_name: req.query.last_name, theId: req.params.id});
});

router.patch('/users/:id', async (req, res) => {
    if (DEBUG) console.log('users.PATCH: ' + req.body.first_name);
    try {
        // await usersDal.patchUser(req.params.id, req.body.first_name, req.body.last_name);
        res.redirect('/users/');
    } catch {
        res.render('503');
    }
});

// /logins route
router.get('/logins', async (req, res) => {
    const logins = [
        {login_id: 1, username: 'user1', password: 'password1'},
        {login_id: 2, username: 'user2', password: 'password2'},
        {login_id: 3, username: 'user3', password: 'password3'}
    ];
    try {
        // let loginData = await loginsDal.getLogins();
        if (DEBUG) console.table(logins);
        res.render('logins', {logins});
    } catch {
        res.render('503');
    }
});

router.get('/logins/:id/edit', async (req, res) => {
    if (DEBUG) console.log('login.Edit : ' + req.params.id);
    res.render('loginPatch.ejs', {username: req.query.username, password: req.query.password, login_id: req.params.id});
});

router.patch('/logins/:id', async (req, res) => {
    if (DEBUG) console.log('logins.PATCH: ' + req.body.username);
    try {
        // await loginsDal.patchLogin(req.params.id, req.body.username, req.body.password);
        res.redirect('/logins/');
    } catch {
        res.render('503');
    }
});

// /flights route
router.get('/flights', async (req, res) => {
    const flights = [
        {flight_id: 1, origin: 'New York', destination: 'Los Angeles', departure_time: '10:00 AM', arrival_time: '1:00 PM'},
        {flight_id: 2, origin: 'London', destination: 'Paris', departure_time: '2:00 PM', arrival_time: '4:00 PM'},
        {flight_id: 3, origin: 'Tokyo', destination: 'Singapore', departure_time: '8:00 PM', arrival_time: '2:00 AM'}
    ];
    try {
        // let flightData = await flightsDal.getFlights();
        if (DEBUG) console.table(flights);
        res.render
    } catch {
        res.render('503');
    }
});