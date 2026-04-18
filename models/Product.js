module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        colors: {
            type: dataTypes.STRING(255)
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    // Aquí es donde hacemos la magia de la relación que dibujaste en el DER
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });
    };

    return Product;
};