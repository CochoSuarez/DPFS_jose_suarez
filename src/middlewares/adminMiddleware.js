function adminMiddleware(req, res, next) {
    // 1. Si no está logueado O si el rol no es 1 (Admin)
    if (!req.session.userLogged || req.session.userLogged.rol != 1) {
        // Lo mandamos al home o a una página de error
        return res.redirect('/'); 
    }
    // 2. Si es admin, lo dejamos pasar al controlador
    next();
}

module.exports = adminMiddleware;