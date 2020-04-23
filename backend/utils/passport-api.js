const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/masuk')
const checknotAuth = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()

function init(passport) {
	passport.use(new LocalStrategy({
		usernameField: 'nama',
		passwordField: 'pw',
	}, async (nama, pw, done) => {
		// const pengguna = db.findOne({})
		if (pengguna == null) 
			return done(null, false, { message: 'Nama salah' });
		try {
			return await bcrypt.compare(pw, pengguna.pw) ? done(null, pengguna) : done(null, false, { message: 'Password/Nama salah' });
		} catch (e) {
			return done(e);
		}
	}));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => done(null, /*db.findOne({})*/ ));
}

module.exports = { init, checkAuth, checknotAuth }