import React, { useState, useEffect } from 'react';

function ContentRowTop() {
    // 1. Definimos las "cajitas" para guardar los totales (empiezan en 0)
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);

    // 2. useEffect se ejecuta una sola vez al cargar el componente
    useEffect(() => {
        // Pedimos los datos a tu API de productos
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                // Guardamos el total que viene de la API
                setTotalProductos(data.count); 
            })
            .catch(error => console.error('Error buscando productos:', error));

        // Pedimos los datos a tu API de usuarios
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                setTotalUsuarios(data.count);
            })
            .catch(error => console.error('Error buscando usuarios:', error));
    }, []);

    return (
        <div className="row" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            
            {/* Tarjeta de Productos - Dinámica */}
            <div style={{ border: '2px solid #c4a77d', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ color: '#050505' }}>Total Productos</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#c4a77d' }}>{totalProductos}</p> 
            </div>

            {/* Tarjeta de Usuarios - Dinámica */}
            <div style={{ border: '2px solid #c4a77d', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ color: '#050505' }}>Total Usuarios</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#c4a77d' }}>{totalUsuarios}</p>
            </div>

            {/* Tarjeta de Categorías - (La dejamos fija por ahora o hasta que tengas la API de categorías) */}
            <div style={{ border: '2px solid #c4a77d', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ color: '#050505' }}>Total Categorías</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#c4a77d' }}>3</p>
            </div>
        </div>
    );
}

export default ContentRowTop;