const router = require('express').Router();
const flightsDal = require('../../services/pg.flights.dal');
const flightsMongoDal = require('../../services/m.flights.dal');

const DEBUG = true;
// GET /api/flights


router.get('/', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/flights/GET ' + req.url);
    try {
        let flights;
        if (req.query.db === 'mongodb') {
            flights = await flightsMongoDal.getFlights();
        } else {
            flights = await flightsDal.getFlights();
        }
        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(503).json({ message: "Service Unavailable", status: 503 });
    }
});

router.get('/search', async(req, res) => {
    try {
        const query = req.query.query;
        let results;
        if (req.query.db === 'mongodb') {
            results = await flightsMongoDal.searchFlights(query);
        } else {
            results = await flightsDal.searchFlights(query);
        }
        res.status(200).json(results);
    } catch {
        res.render('503');
    }
});
// GET /api/flights/:id
router.get('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/flights/:id GET ' + req.url);
    try {
        let flight = await flightsDal.getFlightById(req.params.id);
        if (flight.length === 0) {
            res.statusCode = 404;
            res.json({ message: "Not Found", status: 404 });
        } else {
            res.json(flight);
        }
    } catch {
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});

// POST /api/flights
router.post('/', async(req, res) => {
    if (DEBUG) {
        console.log('ROUTE: /api/flights/ POST');
    }
    try {
        await flightsDal.addFlight(req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.statusCode = 201;
        res.json({ message: "Created", status: 201 });
    } catch {
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});

// PUT /api/flights/:id
router.put('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/flights PUT ' + req.params.id);
    try {
        await flightsDal.putFlight(req.params.id, req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.statusCode = 200;
        res.json({ message: "OK", status: 200 });
    } catch {
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});

// PATCH /api/flights/:id
router.patch('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/flights PATCH ' + req.params.id);
    try {
        await flightsDal.patchFlight(req.params.id, req.body.flightNumber, req.body.destination, req.body.departureTime);
        res.statusCode = 200;
        res.json({ message: "OK", status: 200 });
    } catch {
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});

// DELETE /api/flights/:id
router.delete('/:id', async(req, res) => {
    if (DEBUG) console.log('ROUTE: /api/flights DELETE ' + req.params.id);
    try {
        await flightsDal.deleteFlight(req.params.id);
        res.statusCode = 200;
        res.json({ message: "OK", status: 200 });
    } catch {
        res.statusCode = 503;
        res.json({ message: "Service Unavailable", status: 503 });
    }
});

module.exports = router;