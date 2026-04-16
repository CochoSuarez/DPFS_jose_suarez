const fs = require('fs');
const path = require('path');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    // 1. Buscamos si hay un email guardado en una cookie
    let emailInCookie = req.cookies.userEmail;
    
    // 2. Si hay cookie y NO hay nadie en sesión todavía, lo buscamos en el JSON
    if (emailInCookie && !req.session.userLogged) {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        const userFromCookie = users.find(user => user.email == emailInCookie);

        if (userFromCookie) {
            delete userFromCookie.password; // Por seguridad
            req.session.userLogged = userFromCookie; // Lo logueamos automáticamente
        }
    }

    // 3. Una vez chequeada la cookie, pasamos los datos a locals para el Header
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;