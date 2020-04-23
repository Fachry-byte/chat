const Datastore = require('nedb');
const SessionStore = require('nedb-session-store');

const { makeDBName } = require('../utils/path');

const Auth = new Datastore({ filename: makeDBName('Auth'), autoload: true });
const Message = new Datastore({ filename: makeDBName('Message'), autoload: true });
const SessionData = new SessionStore({ filename: makeDBName('SessionData') });

module.exports = { Auth, Message, SessionData }