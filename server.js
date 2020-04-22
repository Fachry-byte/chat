const http = require('http');
const express = require('express');
const helmet = require('helmet');
const socket = require('socket.io');
const { resolve } = require('path');

const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve('./frontend/views'));
app.use(helmet())
app.use(helmet.noCache())
app.use(helmet.referrerPolicy({ policy: ['no-referrer', 'same-origin'] }))

const server = http.createServer(app);
const io = socket(server);

server.listen(port, _ => console.log(`Listening on port: ${port}`));
