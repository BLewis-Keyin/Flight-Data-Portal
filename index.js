const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Cassian Andor'});
});
app.get('/about', (request, response) => {
    response.render('about.ejs');
});

const actorsRouter = require('./routes/actors')
app.use('/actors', actorsRouter);

const loginsRouter = require('./routes/logins')
app.use('/logins', loginsRouter);

const usersRouter = require('./routes/users')
app.use('/users', usersRouter);

// anything beginning with "/api" will go into this
const apiRouter = require('./routes/api')
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});