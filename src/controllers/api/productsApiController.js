const db = require('../../../models');

const productsApiController = {
    list: async (req, res) => {
        try {
            // Traemos productos incluyendo la relación 'category' que definiste en el modelo
            const products = await db.Product.findAll({
                include: ['category'],
                attributes: ['id', 'name', 'description'] // Usamos los nombres exactos de tu Product.js
            });

            const categories = await db.Category.findAll({
                include: ['products']
            });

            // Conteo por categoría
            let countByCategory = {};
            categories.forEach(cat => {
                // Usamos 'nombre' asumiendo que el modelo Category está en español
                countByCategory[cat.nombre || cat.name] = cat.products.length;
            });

            const productsWithUrl = products.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    detail: `/api/products/${p.id}`,
                    // Accedemos a la relación 'category'
                    category: p.category ? p.category.nombre || p.category.name : 'Sin categoría'
                }
            });

            return res.json({
                count: products.length,
                countByCategory: countByCategory,
                products: productsWithUrl
            });
        } catch (error) {
            console.log("Error en API Products List:", error);
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category']
            });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category ? product.category.nombre || product.category.name : 'Sin categoría',
                imageUrl: `/images/products/${product.image}`,
                detail: `/api/products/${product.id}`
            });
        } catch (error) {
            console.log("Error en API Products Detail:", error);
            return res.status(500).json({ error: 'Error al buscar el producto' });
        }
    }
};

module.exports = productsApiController;