global.DEBUG = false;

const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const PORT = 3000;
const path = require('path');
const imagesPath = path.join(__dirname, 'images');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/images', express.static(imagesPath));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!
app.use(session({
    secret: 'pgd9LHU4k1Su2ZI9Odpfg8rCe0305sMu',
    resave: false,
    saveUninitialized: true,
}));
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session && req.session.user;
    next();
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/notAuth', (request, response) => {
    response.render('notAuth.ejs');
});
app.get('/about', (request, response) => {
    response.render('about.ejs');
});

const flightsRouter = require('./routes/flights')
app.use('/flights', flightsRouter);

const loginsRouter = require('./routes/logins')
app.use('/logins', loginsRouter);

const loginRouter = require('./routes/login')
app.use('/login', loginRouter);

const dashboardRouter = require('./routes/dashboard');
app.use('/dashboard', dashboardRouter);


// anything beginning with "/api" will go into this
const apiRouter = require('./routes/api')
app.use('/api', apiRouter);

const flightsApiRouter = require('./routes/api/flights')
app.use('/api/flights', flightsApiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});