window.addEventListener('load', function() {
    
    // 1. Capturamos el formulario de EDICIÓN y sus campos por ID
    const formulario = document.querySelector('#productEditForm');
    const campoNombre = document.querySelector('#nombre');
    const campoDescripcion = document.querySelector('#descripcion');
    const campoPrecio = document.querySelector('#price');
    const campoImagen = document.querySelector('#image');

    // 2. Escuchamos el evento submit
    formulario.addEventListener('submit', function(evento) {
        
        // Array para recolectar errores
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
            errores.push({ campo: 'price', mensaje: 'Debes ingresar un precio válido mayor a 0' });
        }

        // --- VALIDACIÓN: IMAGEN ---
        // En edición, validamos solo si el usuario cargó algo en el input
        if (campoImagen.value !== "") {
            const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!extensionesPermitidas.exec(campoImagen.value)) {
                errores.push({ campo: 'image', mensaje: 'Formatos permitidos: .jpg, .jpeg, .png o .gif' });
            }
        }

        // 3. Gestión de errores
        if (errores.length > 0) {
            // Frenamos el envío al servidor
            evento.preventDefault();

            // Limpiamos mensajes visuales previos
            const camposConError = ['nombre', 'descripcion', 'price', 'image'];
            camposConError.forEach(id => {
                const p = document.querySelector(`#error-${id}`);
                if (p) p.style.display = 'none';
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