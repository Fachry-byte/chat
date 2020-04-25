const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { init, checknotAuth } = require('../utils/passport-api');
const { Auth: db } = require('../data');

router.use(express.static('./frontend/static'));
init(passport, db);

router.get('/', (req, res) => res.redirect(req.baseUrl + '/masuk'));

router.get('/daftar', checknotAuth, (req, res) => res.render('auth/daftar', { baseUrl: req.baseUrl, respon: req.flash('respon') }));

router.get('/masuk', checknotAuth, (req, res) => res.render('auth/masuk', { baseUrl: req.baseUrl }));

router.post('/masuk', checknotAuth, passport.authenticate('local', {
	successRedirect: '/message',
	failureRedirect: '/auth/masuk',
	failureFlash: true
}));

router.delete('/logout', (req, res) => {
	req.session.destroy(e => res.redirect('/'));
	req.logOut();
});

router.post('/daftar', checknotAuth, async (req, res) => {
	try {
		const { nama, pw } = req.body;
		const isUserExist = async nama => await db.findOne({ nama }) != null ? true : false
		if (await isUserExist(nama)) {
			req.flash('respon', 'Email telah terdaftar!');
			return res.redirect(req.baseUrl + '/daftar');
		} else {
			const hash = bcrypt.genSaltSync(12);
			const password = bcrypt.hashSync(pw, hash);
			await db.insert({
				nama,
				password,
			});
			return res.redirect(req.baseUrl + '/masuk');
		}
	} catch {
		return res.redirect(req.baseUrl + '/daftar');
	}
});

module.exports = router;
