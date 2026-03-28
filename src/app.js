const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// Requerimos los enrutadores
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter'); // <-- Nuevo
const productController = require('./controllers/productController');

// --- CONFIGURACIÓN Y MIDDLEWARES ---
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// --- RUTAS ---

// Home manejado por productController
app.get('/', productController.index);

// Uso de enrutadores con sus prefijos
app.use('/products', productRouter);
app.use('/users', userRouter); // <-- Ahora todas las rutas de usuario pasan por aquí

app.listen(3001, () => console.log('Servidor Boutique funcionando en http://localhost:3001'));