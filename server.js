const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const ejsLayouts = require('express-ejs-layouts');
const { resolve } = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve('./frontend/views'));
app.use(ejsLayouts);

const server = http.createServer(app);
const io = SocketIO(server);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));