global.DEBUG = false // All Global Debugging Messages

global.ROUTE_DEBUG = false // Debugging messages for routes only
global.DAL_DEBUG = false // Debugging messages for DAL only
global.LOG_DEBUG = true // Debugging messages for log only

const DEBUG = false // Debugging messages for this file only

const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const PORT = 3000;
const path = require('path');
const imagesPath = path.join(__dirname, 'images');
const { logActivity } = require('./services/log');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static(imagesPath));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));
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
    logActivity(req, 'Accessed /');
    if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('ROUTE: / GET ' + req.url);
    res.render('index.ejs');
});

app.get('/notAuth', (req, response) => {
    if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('ROUTE: /notAuth GET ' + req.url);
    logActivity(req, 'Accessed /notAuth');
    response.render('notAuth.ejs');
});
app.get('/about', (req, response) => {
    if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('ROUTE: /about GET ' + req.url);
    logActivity(req, 'Accessed /about');
    response.render('about.ejs');
});

const flightsRouter = require('./routes/flights')
if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('flightsRouter: ', flightsRouter);
app.use('/flights', (req, res, next) => {
    logActivity(req, 'Accessed /flights');
    flightsRouter(req, res, next);
});

const loginsRouter = require('./routes/logins');
if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('loginsRouter: ', loginsRouter);
app.use('/logins', (req, res, next) => {
    logActivity(req, 'Accessed /logins');
    loginsRouter(req, res, next);
});


const loginRouter = require('./routes/login');
if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('loginRouter: ', loginRouter);
app.use('/login', (req, res, next) => {
    logActivity(req, 'Accessed /login');
    loginRouter(req, res, next);
});

const dashboardRouter = require('./routes/dashboard');
if (global.DEBUG || global.ROUTE_DEBUG || DEBUG) console.log('dashboardRouter: ', dashboardRouter);
app.use('/dashboard', (req, res, next) => {
    logActivity(req, 'Accessed /dashboard');
    dashboardRouter(req, res, next);
});


// anything beginning with "/api" will go into this
const apiRouter = require('./routes/api')
app.use('/api', apiRouter);

const flightsApiRouter = require('./routes/api/flights')
app.use('/api/flights', flightsApiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Flight Data Portal running on port ${PORT}.`)
});