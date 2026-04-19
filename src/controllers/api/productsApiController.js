const db = require('../../../models');

const productsApiController = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category'],
                // Agregamos 'price' para que Sequelize lo traiga de la DB
                attributes: ['id', 'name', 'description', 'image', 'price'] 
            });

            const categories = await db.Category.findAll({
                include: ['products']
            });

            const lastProduct = await db.Product.findOne({
                order: [['id', 'DESC']],
                include: ['category']
            });

            // Función interna para decidir si es link o archivo local
            const formatImageUrl = (img) => {
                if (!img) return '/images/products/default.jpg';
                return img.includes('http') ? img : `/images/products/${img}`;
            };

            let countByCategory = {};
            categories.forEach(cat => {
                countByCategory[cat.nombre || cat.name] = cat.products.length;
            });

            const productsWithData = products.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price, // <-- Enviamos el precio al Dashboard
                    detail: `/api/products/${p.id}`,
                    category: p.category ? (p.category.nombre || p.category.name) : 'Sin categoría',
                    imageUrl: formatImageUrl(p.image)
                }
            });

            return res.json({
                count: products.length,
                countByCategory: countByCategory,
                latest: {
                    id: lastProduct.id,
                    name: lastProduct.name,
                    description: lastProduct.description,
                    imageUrl: formatImageUrl(lastProduct.image)
                },
                products: productsWithData
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

            if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

            const formatImageUrl = (img) => {
                if (!img) return '/images/products/default.jpg';
                return img.includes('http') ? img : `/images/products/${img}`;
            };

            return res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category ? (product.category.nombre || product.category.name) : 'Sin categoría',
                imageUrl: formatImageUrl(product.image),
                detail: `/api/products/${product.id}`
            });
        } catch (error) {
            console.log("Error en API Products Detail:", error);
            return res.status(500).json({ error: 'Error al buscar el producto' });
        }
    }
};

module.exports = productsApiController;