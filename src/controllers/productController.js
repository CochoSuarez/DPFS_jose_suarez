const db = require('../../models'); 
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

// Función auxiliar para manejar las imágenes (convive local con URLs)
const getImageUrl = (imageName) => {
    if (!imageName) return '/images/products/default-image.png';
    if (imageName.includes('http')) {
        return imageName;
    }
    return `/images/products/${imageName}`;
};

const controller = {

  // 1. Home / Listado (READ)
    index: async (req, res) => {
        try {
            const productsFromDB = await db.Product.findAll({
                include: [{ association: "category" }]
            });

            const products = productsFromDB.map(p => {
                let producto = p.toJSON();
                
                if (producto.image && !producto.image.includes('http')) {
                    producto.image = '/images/products/' + producto.image;
                } 
                if (!producto.image) {
                    producto.image = '/images/products/default-image.png';
                }

                return producto;
            });

            res.render('index', { products });
        } catch (error) {
            console.log("Error en el Index:", error);
            res.send("Error al cargar los productos");
        }
    },

    // 2. Búsqueda de productos (SEARCH)
    search: async (req, res) => {
        try {
            let busqueda = req.query.search;
            const productsFromDB = await db.Product.findAll({
                where: {
                    name: { [Op.like]: '%' + busqueda + '%' }
                },
                include: [{ association: "category" }]
            });

            const products = productsFromDB.map(p => {
                let product = p.toJSON();
                product.imageUrl = getImageUrl(product.image);
                return product;
            });

            res.render('index', { products }); 
        } catch (error) {
            console.log(error);
            res.send("Error al realizar la búsqueda");
        }
    },

    // --- NUEVO: VISTA DEL CARRITO ---
    cart: (req, res) => {
        return res.render('products/productCart');
    },

    // 3. Detalle de un producto (READ)
    detail: async (req, res) => {
        try {
            const productDB = await db.Product.findByPk(req.params.id, {
                include: [{ association: "category" }]
            });

            if (!productDB) {
                return res.send("Producto no encontrado");
            }

            let product = productDB.toJSON();
            product.imageUrl = getImageUrl(product.image);

            res.render('products/productDetail', { product });
        } catch (error) {
            console.log(error);
            res.send("Error al cargar el detalle");
        }
    },

    // 4. Formulario de creación (CREATE)
    create: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            res.render('products/productCreate', { categories });
        } catch (error) {
            console.log(error);
            res.send("Error al cargar el formulario de creación");
        }
    },

    // 5. Acción de creación (Guardado en DB)
    store: async (req, res) => {
        try {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                const categories = await db.Category.findAll();
                return res.render('products/productCreate', {
                    categories,
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            await db.Product.create({
                name: req.body.nombre, 
                description: req.body.descripcion, 
                price: parseFloat(req.body.price),
                category_id: req.body.category,
                image: req.file ? req.file.filename : 'default-image.png'
            });
            res.redirect('/products');
        } catch (error) {
            console.log(error);
            res.send("Error al guardar el producto");
        }
    },

    // 6. Formulario de edición (UPDATE)
    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            const categories = await db.Category.findAll();

            if (!product) {
                return res.send("No se puede editar un producto inexistente");
            }

            res.render('products/productEdit', {
                productToEdit: product,
                categories: categories
            });
        } catch (error) {
            console.log(error);
            res.send("Error al cargar el formulario de edición");
        }
    },

    // 7. Acción de edición (PUT)
    update: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const categories = await db.Category.findAll();
                const product = await db.Product.findByPk(req.params.id);
                return res.render('products/productEdit', {
                    productToEdit: product, 
                    categories,
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            await db.Product.update({
                name: req.body.nombre,
                description: req.body.descripcion,
                price: parseFloat(req.body.price),
                category_id: req.body.category,
                image: req.file ? req.file.filename : undefined
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/products/' + req.params.id);
        } catch (error) {
            console.log(error);
            res.send("Error al actualizar el producto");
        }
    },

    // 8. Acción de borrado (DELETE)
    destroy: async (req, res) => {
        try {
            await db.Product.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/products');
        } catch (error) {
            console.log(error);
            res.send("Error al eliminar el producto");
        }
    }
};

module.exports = controller;