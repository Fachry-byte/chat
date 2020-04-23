const express = require('express')
const router = express.Router()
const { checkAuth, checkLogged, checknotAuth, logged } = require('../utils/passport-api')

router.get('/', (req, res) => res.render('index'));
router.get('/daftar', (req, res) => res.render('daftar'));
router.get('/masuk', (req, res) => res.render('masuk'));

module.exports = router
