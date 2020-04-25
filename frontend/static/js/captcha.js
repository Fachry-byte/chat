function main() {
    const el = document.getElementById('captcha'), len = el.getAttribute('data-captcha')
    captcha(el, len)
}

function captcha(el, len) {
    const dat = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), res = []
    const rand = n => Math.floor(Math.random() * (n + 1))
    for (let i = 0; i <= len; i++) res.push(dat[rand(dat.length)])
    return el.innerHTML = res.join('')
}

document.addEventListener('DOMContentLoaded', main)