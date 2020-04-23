const logged = []
const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/daftar')
const checknotAuth = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()

function checkLogged(req, res, next) {
	for(i in logged) { 
		if(req.user.info.kode == logged[i].id) { 
			if(logged[i].sid != req.sessionID) {
		    	req.flash('respon', 'Pengguna sudah masuk')
		    	req.logOut()
  		    	return res.redirect('/masuk')
		    } else {
		        logged.splice(i, 1)
		    }
		} 
	}
	return next() 
}

module.exports = { checkAuth, checknotAuth, checkLogged, logged }