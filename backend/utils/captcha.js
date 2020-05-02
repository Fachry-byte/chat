let FIELD = 'Capctha', CAPTCHA = null;

class Captcha {
    constructor({ len = 3, field = FIELD }) {
        this.length = len;
        this.field = field;
        this.code = null;
        FIELD = this.field;
    }
    generate() {
        const dat = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), res = [];
        const rand = n => Math.floor(Math.random() * n);
        for (let i = 1; i <= this.length; i++) res.push(dat[rand(dat.length)]);
        CAPTCHA = res.join('')
        return this.code = res.join('');
    }
}

function checkCaptcha(req, res, next) {
    if(req.body[FIELD] == CAPTCHA) return next();
    req.flash('respon', 'Captcha salah');
    return res.redirect(req.originalUrl);
}

module.exports = { Captcha, checkCaptcha };




