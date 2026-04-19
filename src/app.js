const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// --- REQUERIMOS LOS ENRUTADORES ---
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

// --- ENRUTADORES DE LAS APIs ---
const apiUsersRouter = require('./routes/api/usersApiRoutes'); 
const apiProductsRouter = require('./routes/api/productsApiRoutes'); // <-- NUEVO: Paso 3a

const productController = require('./controllers/productController');

// --- REQUERIMOS LOS MIDDLEWARES DE APLICACIÓN ---
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// --- CONFIGURACIÓN Y MIDDLEWARES ---
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// Middlewares para formularios y métodos PUT/DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configuración de Session
app.use(session({
    secret: "Nuestro mensaje secreto de Boutique",
    resave: false,
    saveUninitialized: false
}));

// Configuración de Cookies
app.use(cookieParser());

// Middleware de Logueo (SIEMPRE después de session y cookie-parser)
app.use(userLoggedMiddleware);

// --- RUTAS ---

// Home manejado por productController
app.get('/', productController.index);

// Uso de enrutadores con sus prefijos
app.use('/products', productRouter);
app.use('/users', userRouter);

// --- RUTAS DE LAS APIs ---
app.use('/api/users', apiUsersRouter); 
app.use('/api/products', apiProductsRouter); // <-- NUEVO: Paso 3b

// Levantamos el servidor (Mantenemos tu puerto 3001)
app.listen(3001, () => console.log('Servidor Boutique funcionando en http://localhost:3001'));