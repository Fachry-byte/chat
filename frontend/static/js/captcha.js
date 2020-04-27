function main() {
    const el = document.getElementById('captcha'), inp = document.getElementById('captcha-input'), len = el.getAttribute('data-captcha');
    const c = captcha(el, len), btn = document.querySelector('[type="submit"]'), form = document.getElementById('form-c'), res = document.getElementById('captcha-res')
    discopypaste(el);
    btn.onclick = _ => {
        if (inp.value != c || inp.value == '') {
            sendform(form, 0);
            setTimeout(_ => res.innerHTML = '', 1000);
            return res.value = 'Salah';
        }
        return sendform(form, 1);
    }
}

function captcha(el, len) {
    const dat = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), res = [];
    const rand = n => Math.floor(Math.random() * n);
    for (let i = 1; i <= len; i++) res.push(dat[rand(dat.length)]);
    el.value = res.join('');
    return res.join('');
}

function sendform(element, submit) {
    return submit == true ? element.onsubmit = _ => true : element.onsubmit = _ => false
}

function discopypaste(el) {
    el.oncontextmenu = false;
    return false;
}

document.addEventListener('DOMContentLoaded', main);