const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.render('message/index'));

module.exports = router;