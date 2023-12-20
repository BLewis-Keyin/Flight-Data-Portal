const express = require('express');
const router = express.Router();
const flightsDal = require('../services/pg.flights.dal');

DEBUG = false


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/notAuth');
    }
};

router.get('/', isAuthenticated, async(req, res) => {
    try {
        let flights = await flightsDal.getFlights();
        // if (DEBUG) console.table(flights);
        res.render('flights', { flights });
    } catch {
        res.render('503');
    }
});
router.get('/search', async(req, res) => {
    try {
        const query = req.query.query;
        const results = await flightsDal.searchFlights(query);
        res.render('flightsSearch', { results, query });
    } catch {
        res.render('503');
    }
});

router.get('/:id', async(req, res) => {
    try {
        const flight = await flightsDal.getFlightById(req.params.id);
        if (DEBUG) console.log(`flights.router.get/:id ${flight}`);
        if (flight)
            res.render('flight', { flight });
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});


router.post('/', async(req, res) => {
    if (DEBUG) console.log("flights.POST");
    try {
        await flightsDal.addFlight(req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.redirect('/flights/');
    } catch {
        res.render('503');
    }
});

router.put('/:id', async(req, res) => {
    if (DEBUG) console.log('flights.PUT: ' + req.params.id);
    try {
        await flightsDal.putFlight(req.params.id, req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.redirect('/flights/');
    } catch {
        res.render('503');
    }
});

router.patch('/:id', async(req, res) => {
    if (DEBUG) console.log('flights.PATCH: ' + req.params.id);
    try {
        await flightsDal.patchFlight(req.params.id, req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.redirect('/flights/');
    } catch {
        res.render('503');
    }
});

router.delete('/:id', async(req, res) => {
    if (DEBUG) console.log('flights.DELETE: ' + req.params.id);
    try {
        await flightsDal.deleteFlight(req.params.id);
        res.redirect('/flights/');
    } catch (err) {
        if (DEBUG) console.error(err);
        res.render('503');
    }
});



module.exports = router;