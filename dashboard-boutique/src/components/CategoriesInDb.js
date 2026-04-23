import React, { useState, useEffect } from 'react';

function CategoriesInDb() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                setCategories(data.countByCategory);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const categoriesArray = Object.keys(categories);

    return (
        <div style={{ width: '100%' }}>
            <h3 style={{ color: '#050505', textAlign: 'center', marginBottom: '20px', fontSize: '22px' }}>Distribución por Categoría</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {categoriesArray.map((category, i) => (
                    <div key={i} style={{ 
                        backgroundColor: '#050505', 
                        color: '#c4a77d', 
                        padding: '25px', 
                        borderRadius: '5px', 
                        border: '1px solid #c4a77d',
                        minWidth: '225px', 
                        textAlign: 'center',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
                    }}>
                        <p style={{ fontWeight: 'bold', margin: 0, fontSize: '18px', textTransform: 'uppercase' }}>{category}</p>
                        <p style={{ fontSize: '35px', margin: '10px 0 0 0', fontWeight: 'bold' }}>{categories[category]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesInDb;