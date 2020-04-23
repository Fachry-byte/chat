const http = require('http');
const express = require('express');
const helmet = require('helmet');
const socket = require('socket.io');
const flash = require('express-flash');
const passport = require('passport')
const methodOverride = require('method-override');
const { resolve } = require('path');
const noCache = require('nocache');
const session = require('express-session');
const cookie = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 5000;
const secret = process.env.KUNCI;
const app = express();

const { Auth } = require(resolve('./backend/routes'));

// session store tak hapus dulu

app.set('view engine', 'ejs');
app.set('views', resolve('./frontend/views'));

const sess = {
    secret,
    name: 'Session ID',
    cookie: { httpOnly: true },
    resave: false,
    saveUninitialized: false,
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(express.static(resolve('./frontend/static')));

app.use(helmet());
app.use(noCache());
app.use(helmet.referrerPolicy({ policy: ['no-referrer', 'same-origin'] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie(secret))
app.use(session(sess));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_m'))

// app.use('/', (req,res) => res.render('index'));
// app.use('/auth', Auth);

app.use('/', Auth);

const server = http.createServer(app);
const io = socket(server);

server.listen(port, _ => console.log(`Listening on port ${port}`));
