const express = require('express');
const passport = require('passport');
const router = express.Router();
const { init, checkAuth, checknotAuth } = require('../utils/passport-api');

init(passport);

router.get('/', checkAuth, (req, res) => res.render('index', { nama: req.user.nama }));

router.get('/daftar', checknotAuth, (req, res) => res.render('auth/daftar'));

router.get('/masuk', checknotAuth, (req, res) => res.render('auth/masuk'));

router.post('/masuk', checknotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/masuk',
    failureFlash: true
}));

router.post('/daftar', checknotAuth, async (req, res) => {
    try {
        // db.insert
        return res.redirect('/masuk');
    } catch {
        return res.redirect('/daftar');
    }
});

module.exports = router
