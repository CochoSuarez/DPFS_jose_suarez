module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'categories', 
        timestamps: false 
    };

    const Category = sequelize.define(alias, cols, config);

    // --- AGREGAMOS ESTA PARTE PARA LA CONEXIÓN ---
    Category.associate = function(models) {
        Category.hasMany(models.Product, { 
            as: "products", // Un nombre para identificar la relación
            foreignKey: "category_id" // El nombre de la columna en la tabla de productos
        });
    };

    return Category;
};