const fs = require('fs');
const path = require('path');

// Ubicación del archivo JSON
const productsFilePath = path.join(__dirname, '../data/products.json');

const controller = {
    // 1. Home / Listado (READ)
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Renderiza el index.ejs pasándole el array de productos
        res.render('index', { products });
    },

    // 2. Detalle de un producto (READ)
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(p => p.id == req.params.id);
        
        if (!product) {
            return res.send("Producto no encontrado");
        }
        
        res.render('products/productDetail', { product });
    },

    // 3. Formulario de creación (CREATE)
    create: (req, res) => {
        res.render('products/productCreate');
    },

    // 4. Acción de creación (Guardado en el JSON)
    store: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            colors: req.body.colors,
            image: req.file ? req.file.filename : 'default-image.png'
        };

        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        
        res.redirect('/products');
    },

    // 5. Formulario de edición (UPDATE)
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(p => p.id == req.params.id);
        
        if (!product) {
            return res.send("No se puede editar un producto inexistente");
        }
        
        res.render('products/productEdit', { productToEdit: product });
    },

    // 6. Acción de edición (PUT)
    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const index = products.findIndex(p => p.id == req.params.id);

        if (index !== -1) {
            products[index] = {
                id: products[index].id,
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category: req.body.category,
                image: req.file ? req.file.filename : products[index].image
            };

            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        }
        
        res.redirect('/products/' + req.params.id);
    },

    // 7. Acción de borrado (DELETE)
    destroy: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        products = products.filter(p => p.id != req.params.id);
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        
        res.redirect('/products');
    }
};

module.exports = controller;