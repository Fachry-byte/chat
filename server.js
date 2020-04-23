const http = require('http');
const express = require('express');
const helmet = require('helmet');
const socket = require('socket.io');
const passport = require('passport');
const methodOverride = require('method-override')
const { resolve } = require('path');
const noCache = require('nocache');
const session = require('express-session');
const cookie = require('cookie-parser');
const flash = require('express-flash');

require('dotenv').config();

const { SessionData } = require('./backend/db');
const { Auth } = require(resolve('./backend/routes'));

const port = process.env.PORT || 5000;
const secret = process.env.KUNCI;
const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve('./frontend/views'));

const sess = {
    secret,
    cookie: { httpOnly: true },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({ filename: SessionData })
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(express.static(resolve('./frontend/static')));

app.use(helmet());
app.use(noCache());
app.use(helmet.referrerPolicy({ policy: ['no-referrer', 'same-origin'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie(secret));
app.use(session(sess));

app.get('/', (req, res) => res.render('index'));

app.get('/login', (req, res) => res.render('login'));

const server = http.createServer(app);
const io = socket(server);

server.listen(port, _ => console.log(`Listening on port ${port}`));
