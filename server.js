const http = require('http');
const express = require('express');
const helmet = require('helmet');
const socket = require('socket.io');
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
app.use(helmet.referrerPolicy());


app.get('/', (req, res) => {
    res.render('index')
});

app.use('/auth', Auth);

const server = http.createServer(app);
const io = socket(server);

server.listen(port, _ => console.log(`Listening on port ${port}`));
