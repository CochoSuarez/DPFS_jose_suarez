Sprint 1: Planificación
Dinámica de la Estrella de Mar:

Comenzar a hacer: Definir diseño/paleta de colores final de manera simple y práctica.

Hacer más: Aprovechar más las funciones de Figma para que en los wireframes se entienda mejor la función de cada campo (diferenciar botones, campos de texto, textos con links, etc.).

Continuar haciendo: Mantener la estética minimalista y el enfoque en instrumentos de alta gama.

Hacer menos: Perder tiempo buscando la fuente perfecta; elegir una y avanzar.

Dejar de hacer: Agregar funcionalidades extra a lo solicitado, en especial las muy complejas.

Sprint 2: Maquetación Estática
Conclusiones:

Logramos armar el HTML y CSS de las páginas principales (Home, Detalle, Carrito, Login y Registro).

Se mantuvo la línea estética oscura y simple acordada en el Sprint 1.

El mayor desafío fue lograr que la grilla de productos se vea ordenada.

Sprint 3: Dinamismo (Node + Express + EJS)
Conclusiones:

Pasamos el sitio de HTML estático a un sistema dinámico con Express y EJS.

Partials: Separamos el Head, Header y Footer para no repetir código.

Carpetas: Organizamos las vistas en /products y /users como pedía el Sprint.

Nuevas Vistas: Sumamos el listado de productos y los formularios de creación y edición sin cambiar el diseño que ya teníamos.




Sprint 4: JSON y CRUD de Productos
Planificación y Tareas:

Estructura de Datos:** Creación de carpeta data y archivos products.json y users.json. 
Refactor de Controladores:** Modificar productController.js para leer el JSON usando el módulo fs.
Rutas CRUD: Implementar las 7 rutas principales (Listado, Detalle, Creación, Guardado, Edición, Actualización y Borrado).
Métodos HTTP: Implementar POST, PUT y DELETE para que los formularios afecten al archivo JSON.
Pruebas de Funcionalidad: Verificar que al borrar un producto desaparezca del JSON.



Sprint 5: Session, Cookies y Usuarios
Planificación y Tareas:

Seguridad: Encriptación de contraseñas con bcryptjs en el registro y login. 

Session y Cookies: Implementación de "sesión" para mantener al usuario logueado y "cookies" para la función de recordarme. 

Middlewares: Creación de filtros para proteger el acceso a ciertas rutas (como el perfil). 

Header Dinámico: Modificación del menú para que cambie según si el usuario inició sesión o no. 

Conclusiones:

Lo más difícil fue entender cómo pasar los datos del usuario a todas las vistas usando el middleware de aplicación.

Me sirvió mucho ver cómo el sitio "cambia" solo cuando te logueás, lo hace ver mucho más profesional.

Aprendí a usar las herramientas de desarrollador del navegador para revisar si las cookies se estaban creando bien.