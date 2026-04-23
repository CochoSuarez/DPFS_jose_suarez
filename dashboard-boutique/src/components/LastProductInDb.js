import React, { useState, useEffect } from 'react';

function LastProductInDb() {
    const [latestProduct, setLatestProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                setLatestProduct(data.latest);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    if (!latestProduct) return <p style={{color: '#050505'}}>Cargando último producto...</p>;

    return (
        <div style={{ 
            backgroundColor: '#050505', 
            border: '1px solid #c4a77d', 
            borderRadius: '8px', 
            padding: '15px', 
            color: 'white', 
            maxWidth: '400px', 
            margin: '0 auto',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.2)'
        }}>
            <h3 style={{ color: '#c4a77d', textAlign: 'center', fontSize: '18px', marginTop: '0' }}>Último Producto Creado</h3>
            
            <div style={{ textAlign: 'center', margin: '15px 0' }}>
                <img 
                    src={latestProduct.imageUrl.includes('http') ? latestProduct.imageUrl : `http://localhost:3001${latestProduct.imageUrl}`} 
                    alt={latestProduct.name} 
                    style={{ 
                        width: '70%', 
                        minHeight: '150px', 
                        borderRadius: '5px', 
                        border: '1px solid #333', 
                        backgroundColor: '#1a1a1a',
                        objectFit: 'cover'
                    }}
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/400x300/050505/c4a77d?text=Instrumentos+Boutique';
                    }} 
                />
            </div>
            
            <h4 style={{ color: '#c4a77d', fontSize: '16px', marginBottom: '8px' }}>{latestProduct.name}</h4>
            <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#ccc' }}>{latestProduct.description}</p>
        </div>
    );
}

export default LastProductInDb;