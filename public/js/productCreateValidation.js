window.addEventListener('load', function() {
    
    // 1. Capturamos el formulario y los inputs
    const formulario = document.querySelector('#productForm');
    const campoNombre = document.querySelector('#nombre');
    const campoDescripcion = document.querySelector('#descripcion');
    const campoPrecio = document.querySelector('#price');
    const campoImagen = document.querySelector('#image');

    // 2. Escuchamos el evento de envío (submit)
    formulario.addEventListener('submit', function(evento) {
        
        // Array para guardar los errores
        let errores = [];

        // --- VALIDACIÓN: NOMBRE ---
        if (campoNombre.value.trim() === "") {
            errores.push({ campo: 'nombre', mensaje: 'El nombre es obligatorio' });
        } else if (campoNombre.value.length < 5) {
            errores.push({ campo: 'nombre', mensaje: 'El nombre debe tener al menos 5 caracteres' });
        }

        // --- VALIDACIÓN: DESCRIPCIÓN ---
        if (campoDescripcion.value.length < 20) {
            errores.push({ campo: 'descripcion', mensaje: 'La descripción debe tener al menos 20 caracteres' });
        }

        // --- VALIDACIÓN: PRECIO ---
        if (campoPrecio.value === "" || campoPrecio.value <= 0) {
            errores.push({ campo: 'price', mensaje: 'Debes ingresar un precio mayor a 0' });
        }

        // --- VALIDACIÓN: IMAGEN ---
        if (campoImagen.value !== "") {
            const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!extensionesPermitidas.exec(campoImagen.value)) {
                errores.push({ campo: 'image', mensaje: 'Formato de imagen no válido (usar .jpg, .png o .gif)' });
            }
        }

        // 3. Gestión de Errores
        if (errores.length > 0) {
            // FRENAMOS el envío del formulario
            evento.preventDefault();

            // Limpiamos mensajes anteriores para que no se dupliquen
            const mensajesError = [ 'nombre', 'descripcion', 'price', 'image' ];
            mensajesError.forEach(id => {
                document.querySelector(`#error-${id}`).style.display = 'none';
            });

            // Mostramos los nuevos errores
            errores.forEach(error => {
                const parrafoError = document.querySelector(`#error-${error.campo}`);
                if (parrafoError) {
                    parrafoError.innerText = error.mensaje;
                    parrafoError.style.display = 'block';
                }
            });
        }
    });
});