const express = require('express');
const router = express.Router();
//const actorsDal = require('../services/pg.actors.dal')
const actorsDal = require('../services/m.actors.dal')

// https://localhost:3000/actors/
router.get('/', async (req, res) => {
    // const theActors = [
    //     {first_name: 'Youn', last_name: 'Yuh-jung'},
    //     {first_name: 'Laura', last_name: 'Dern'},
    //     {first_name: 'Regina', last_name: 'King'}
    // ];
    try {
        let theActors = await actorsDal.getActors(); 
        if(DEBUG) console.table(theActors);
        res.render('actors', {theActors});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
    // const anActor = [
    //     {first_name: 'Regina', last_name: 'King'}
    // ];
    try {
        const anActor = await actorsDal.getActorByActorId(req.params.id); // from postgresql
        if(DEBUG) console.log(`actors.router.get/:id ${anActor}`);
        if (anActor)
            res.render('actor', {anActor});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('actor.Replace : ' + req.params.id);
    res.render('actorPut.ejs', {firstName: req.query.firstName, lastName: req.query.lastName, theId: req.params.id});
});

// https://localhost:3000/actors/205/edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('actor.Edit : ' + req.params.id);
    res.render('actorPatch.ejs', {firstName: req.query.firstName, lastName: req.query.lastName, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('actor.Delete : ' + req.params.id);
    res.render('actorDelete.ejs', {firstName: req.query.firstName, lastName: req.query.lastName, theId: req.params.id});
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("actors.POST");
    try {
        await actorsDal.addActor(req.body.firstName, req.body.lastName );
        res.redirect('/actors/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('actors.PUT: ' + req.params.id);
    try {
        await actorsDal.putActor(req.params.id, req.body.firstName, req.body.lastName);
        res.redirect('/actors/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('actors.PATCH: ' + req.params.id);
    try {
        await actorsDal.patchActor(req.params.id, req.body.firstName, req.body.lastName);
        res.redirect('/actors/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('actors.DELETE: ' + req.params.id);
    try {
        await actorsDal.deleteActor(req.params.id);
        res.redirect('/actors/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        res.render('503');
    }
});

module.exports = router