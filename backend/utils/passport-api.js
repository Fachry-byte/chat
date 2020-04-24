const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/auth/masuk');
const checknotAuth = (req, res, next) => req.isAuthenticated() ? res.redirect('/message') : next();

const { Auth: db } = require('../data');

function init(passport) {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'pw',
	}, async (email, pw, done) => {
		const pengguna = await db.findOne({ email });
		if (pengguna == null) 
			return done(null, false, { message: 'Email anda tidak terdaftar' });
		try {
			return await bcrypt.compare(pw, pengguna.password) ? done(null, pengguna) : done(null, false, { message: 'Password/Email salah' });
		} catch (e) {
			return done(e);
		}
	}));
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser(async (_id, done) => {
		const user = await db.findOne({ _id });
		done(null, user);
	});
}

module.exports = { init, checkAuth, checknotAuth }