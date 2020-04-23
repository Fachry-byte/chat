const Datastore = require('nedb');
const { join } = require('path');

const mainPath = join(__dirname, 'db');

const data = filename => {
	const str = filename + '.db';
	return join(mainPath, str)
}

const Auth = new Datastore({ filename: data('Auth'), autoload: true });
const Message = new Datastore({ filename: data('Message'), autoload: true });

module.exports = { Auth, Message }