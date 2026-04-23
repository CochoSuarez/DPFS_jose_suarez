import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                // Borramos el console.log y dejamos solo el setProducts
                setProducts(data.products); 
            })
            .catch(error => console.error('Error cargando lista:', error));
    }, []);
    
    return (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#050505', borderRadius: '8px', border: '1px solid #c4a77d' }}>
            <h3 style={{ color: '#c4a77d', textAlign: 'center', marginBottom: '20px' }}>Listado de Guitarras</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #c4a77d' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #333' }}>
                            <td style={{ padding: '10px' }}>{product.id}</td>
                            <td style={{ padding: '10px' }}>{product.name}</td>
                            <td style={{ padding: '10px' }}>$ {product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;