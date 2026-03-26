const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// RUTAS
app.get('/', (req, res) => res.render('index'));

// Productos
app.get('/products', (req, res) => res.render('products/productList'));
app.get('/products/detalle', (req, res) => res.render('products/productDetail'));
app.get('/products/carrito', (req, res) => res.render('products/productCart'));
app.get('/products/crear', (req, res) => res.render('products/productCreate'));
app.get('/products/editar', (req, res) => res.render('products/productEdit'));

// Usuarios
app.get('/users/login', (req, res) => res.render('users/login'));
app.get('/users/registro', (req, res) => res.render('users/register'));

app.listen(3001, () => console.log('Servidor Boutique funcionando en http://localhost:3001'));