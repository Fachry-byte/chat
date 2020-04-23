require('dotenv').config()

const http = require('http');
const express = require('express');
const helmet = require('helmet');
const socket = require('socket.io');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { resolve } = require('path');
const noCache = require('nocache');

// Routing
const { Auth } = require(resolve('./backend/routes'));

const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve('./frontend/views'));
app.use(express.static(resolve('./frontend/static')));

app.use(helmet());
app.use(noCache());
app.use(helmet.referrerPolicy({ policy: ['no-referrer', 'same-origin'] }));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
	secret: process.env.KUNCI, 
	name: 'SID',
	cookie: { httpOnly: true },
	resave: false, 
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_m'));

app.use('/auth', Auth);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login')
})


const server = http.createServer(app);
const io = socket(server);

server.listen(port, _ => console.log(`Listening on port ${port}`));
