import React from 'react';
import './App.css';
import ContentRowTop from './components/ContentRowTop';
import ProductList from './components/ProductList';
import LastProductInDb from './components/LastProductInDb';
import CategoriesInDb from './components/CategoriesInDb';

function App() {
  return (
    <div className="App" style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>

      <header style={{
        backgroundColor: '#050505',
        padding: '25px',
        color: '#c4a77d',
        borderBottom: '3px solid #c4a77d',
        textAlign: 'center',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ margin: 0, letterSpacing: '3px', fontSize: '28px' }}>INSTRUMENTOS BOUTIQUE</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', textTransform: 'uppercase', opacity: 0.8 }}>Dashboard</p>
      </header>

      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Sección de Totales */}
        <section style={{ marginBottom: '50px' }}>
          <ContentRowTop />
        </section>

        {/* Sección Media: Producto Destacado y Categorías con nuevas proporciones */}
        <section style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'stretch',
          marginBottom: '60px'
        }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <LastProductInDb />
          </div>
          <div style={{ flex: '1.8', minWidth: '500px' }}>
            <CategoriesInDb />
          </div>
        </section>

        {/* Listado de Productos */}
        <section>
          <ProductList />
        </section>

      </main>

      <footer style={{ textAlign: 'center', color: '#999', fontSize: '13px', marginTop: '50px' }}>
        &copy; 2026 Instrumentos Boutique | Panel de Administración Integrador
      </footer>
    </div>
  );
}

export default App;