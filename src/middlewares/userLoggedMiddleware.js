const db = require('../../models'); // Asegurate de que esta ruta apunte a tus modelos de Sequelize

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    // 1. Buscamos si hay un email guardado en la cookie "userEmail"
    let emailInCookie = req.cookies.userEmail;
    
    // 2. Si hay cookie y NO hay nadie en sesión todavía, lo buscamos en la BD
    if (emailInCookie && !req.session.userLogged) {
        try {
            // Buscamos al usuario por su email usando Sequelize
            let userFromCookie = await db.User.findOne({
                where: { email: emailInCookie }
            });

            if (userFromCookie) {
                // Convertimos el resultado a un objeto plano y quitamos el password por seguridad
                let userToLog = userFromCookie.get({ plain: true });
                delete userToLog.password;
                
                req.session.userLogged = userToLog; // Lo logueamos automáticamente
            }
        } catch (error) {
            console.log("Error al recuperar el usuario desde la cookie:", error);
        }
    }

    // 3. Si hay alguien en sesión, pasamos los datos a locals para las vistas (Header)
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;