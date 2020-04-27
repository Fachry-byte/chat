const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.render("message/index", { nama: req.user.nama })
);

module.exports = router;
