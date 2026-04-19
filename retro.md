Sprint 1: Planificación
Comenzar a hacer: Definir diseño/paleta de colores final de manera simple y práctica.

Hacer más: Aprovechar Figma para diferenciar mejor botones y campos de texto.

Continuar haciendo: Mantener la estética minimalista y el enfoque en instrumentos de alta gama.

Hacer menos: Perder tiempo buscando la fuente perfecta; elegir una y avanzar.

Dejar de hacer: Agregar funcionalidades extra complejas no solicitadas.

Sprint 2: Maquetación Estática
Logramos armar el HTML y CSS de las páginas principales.

Se mantuvo la línea estética oscura y simple (negro y dorado).

El mayor desafío fue lograr que la grilla de productos se vea ordenada.

Sprint 3: Dinamismo (Node + Express + EJS)
Pasamos el sitio de HTML estático a un sistema dinámico con Express y EJS.

Partials: Separamos Head, Header y Footer para no repetir código.

Carpetas: Organizamos las vistas en /products y /users.

Sumamos listado y formularios de CRUD sin cambiar el diseño original.

Sprint 4: JSON y CRUD de Productos
Estructura: Creamos archivos JSON para productos y usuarios.

Controladores: Usamos el módulo fs para leer y escribir datos.

Rutas: Implementamos las 7 rutas principales de un CRUD.

Métodos: Usamos POST, PUT y DELETE para que los cambios queden grabados en el JSON.

Sprint 5: Session, Cookies y Usuarios
Seguridad: Encriptamos contraseñas con bcryptjs.

Session y Cookies: Implementamos el logueo y la función "recordarme".

Middlewares: Protegimos rutas privadas (como el Perfil) para que no entre cualquiera.

Header: Hicimos que el menú cambie si hay un usuario logueado.

Sprint 6: Base de Datos y Sequelize
Migración: Dejamos atrás los JSON y pasamos todo a una base de datos MySQL.

Modelos: Creamos los modelos de Product, User y Category.

Buscador: Implementamos una barra de búsqueda que funciona de verdad.

Relaciones: Conectamos productos con sus categorías usando asociaciones de Sequelize.

Sprint 7: Validaciones y APIs
Validaciones: Agregamos seguridad en los formularios con express-validator (Back) y JavaScript (Front).

Seguridad Extra: Ahora el sitio avisa si falta un campo antes de enviar el formulario.

APIs: Creamos rutas que devuelven JSON de usuarios y productos para que otros sistemas lean nuestros datos.

Desafío: Fue difícil coordinar los nombres de las variables entre inglés y español, pero logramos que todo conecte bien.

Sprint 8: APIs y Dashboard en React

APIs de Usuarios: Creamos endpoints para listar usuarios y ver sus detalles en formato JSON, asegurando que no se filtre información sensible como contraseñas.

APIs de Productos: Implementamos rutas que devuelven el total de productos, el conteo por categorías y el detalle individual con sus relaciones y URLs de imágenes.

Dashboard React: Desarrollamos una aplicación independiente y modularizada para visualizar las métricas del negocio (totales de productos, usuarios y categorías).

Consumo de Datos: Logramos que React se comunique con nuestra API de Node.js para mostrar el último producto creado y el listado completo de instrumentos.

Metodologías Ágiles: Reiniciamos el tablero de trabajo para organizar la transición entre el back-end tradicional y el front-end moderno con React.