const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
const logg = []

const { init, checknotAuth, isLogin } = require('../utils/passport-api');
const { Auth: db } = require('../data');
const { Captcha, checkCaptcha } = require('../utils/captcha');
const captcha = new Captcha({ len: 4, field: 'captcha' });
 
init(passport, db);

router.get("/", (req, res) => res.redirect(req.baseUrl + "/masuk"));

router.get("/daftar", checknotAuth, (req, res) =>
  res.render("Auth/daftar", {
    baseUrl: req.baseUrl,
    respon: req.flash("respon"),
    captcha: captcha.generate()
  })
);

router.get("/masuk", checknotAuth, (req, res) =>
  res.render("Auth/masuk", { 
    baseUrl: req.baseUrl,
    respon: req.flash("respon"),
    captcha: captcha.generate()
  })
);

router.post(
  "/masuk",
  checknotAuth,
  checkCaptcha,
  passport.authenticate("local", {
    failureRedirect: "/auth/masuk",
    failureFlash: true,
  }),
  logged
);

router.delete("/logout", (req, res) => {
  logg.splice(logg.indexOf(req.sessionID), 1);
  req.session.destroy((e) => res.redirect("/"));
  req.logOut();
});

router.post("/daftar", checknotAuth, checkCaptcha, async (req, res) => {
  try {
    const { nama, pw } = req.body;
    const isUserExist = async (nama) =>
      (await db.findOne({ nama })) != null ? true : false;
    if (await isUserExist(nama)) {
      req.flash("respon", "Pengguna telah terdaftar!");
      return res.redirect(req.baseUrl + "/daftar");
    } else {
      const hash = bcrypt.genSaltSync(12);
      const password = bcrypt.hashSync(pw, hash);
      await db.insert({
        nama,
        password,
      });
      return res.redirect(req.baseUrl + "/masuk");
    }
  } catch {
    return res.redirect(req.baseUrl + "/daftar");
  }
});

async function logged(req, res) {
  const { nama } = req.body;
  for(i of logg) {
    if(nama === i.n) {
      if(req.sessionID !== i.id) {
        req.flash('respon', 'Siswa sudah masuk');
        res.redirect('/Auth/masuk');
        return req.logOut(); 
      } else {
        logg.splice(logg.indexOf(i.n), 1);
      }
    } 
  }
  logg.push({ n: nama, i: req.sessionID });
  return res.redirect('/message');
}

module.exports = router;
