const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { init, checkAuth, checknotAuth } = require('../utils/passport-api');

const { Auth } = require('../data');

init(passport);

// router.get('/', checkAuth, (req, res) => res.render('index', { nama: req.user.nama }));

router.get('/', (req,res) => res.redirect(req.baseUrl + '/masuk'));

router.get('/daftar', checknotAuth, (req, res) => res.render('auth/daftar', { baseUrl: req.baseUrl }));

router.get('/masuk', checknotAuth, (req, res) => res.render('auth/masuk', { baseUrl: req.baseUrl }));

router.post('/masuk', checknotAuth, passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/masuk',
    failureFlash: true
}));

router.delete('/logout', (req,res) => {
	req.logOut();
	res.redirect(req.baseUrl + '/masuk');
});

router.post('/daftar', checknotAuth, async (req, res) => {
    try {
		const { email,pwi,nama } = req.body;
		
		const isUserExist = async function (email) {
			try {
				const user = await Auth.findOne({ email });
				return false;
			} catch {
				return true;
			}
		}
		
		if(await isUserExist(email)) {
			req.flash('error', 'Email telah terdaftar !');
			res.redirect('/daftar');
		} else {
			const hash = await bcryptjs.genSaltSync(12);
			const password = await bcryptjs.hashSync(pwi,hash);
			
			await Auth.insert({
				email,
				password,
				nama
			});
			
			req.flash('success', 'Akun telah terdaftar. Silahkan Login');
			return res.redirect(req.baseUrl + '/masuk');
		}
    } catch {
        return res.redirect(req.baseUrl + '/daftar');
    }
});

module.exports = router
