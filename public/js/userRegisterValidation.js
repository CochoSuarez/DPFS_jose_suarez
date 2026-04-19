window.addEventListener('load', function() {
    
    // 1. Capturamos el formulario y los inputs por su ID
    const formulario = document.querySelector('#registerForm');
    const campoNombre = document.querySelector('#nombre');
    const campoEmail = document.querySelector('#email');
    const campoPassword = document.querySelector('#password');
    const campoAvatar = document.querySelector('#avatar');

    // 2. Escuchamos el evento submit
    formulario.addEventListener('submit', function(evento) {
        
        let errores = [];

        // --- VALIDACIÓN: NOMBRE ---
        if (campoNombre.value.trim() === "") {
            errores.push({ campo: 'nombre', mensaje: 'Debes ingresar tu nombre completo' });
        } else if (campoNombre.value.length < 2) {
            errores.push({ campo: 'nombre', mensaje: 'El nombre debe tener al menos 2 caracteres' });
        }

        // --- VALIDACIÓN: EMAIL ---
        const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (campoEmail.value.trim() === "") {
            errores.push({ campo: 'email', mensaje: 'El correo electrónico es obligatorio' });
        } else if (!reEmail.test(campoEmail.value)) {
            errores.push({ campo: 'email', mensaje: 'Debes ingresar un formato de correo válido' });
        }

        // --- VALIDACIÓN: PASSWORD ---
        if (campoPassword.value.trim() === "") {
            errores.push({ campo: 'password', mensaje: 'La contraseña es obligatoria' });
        } else if (campoPassword.value.length < 8) {
            errores.push({ campo: 'password', mensaje: 'La contraseña debe tener al menos 8 caracteres' });
        }

        // --- VALIDACIÓN: AVATAR (Imagen) ---
        if (campoAvatar.value !== "") {
            const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!extensionesPermitidas.exec(campoAvatar.value)) {
                errores.push({ campo: 'avatar', mensaje: 'Formatos aceptados: .jpg, .jpeg, .png, .gif' });
            }
        }

        // 3. Control de Errores
        if (errores.length > 0) {
            // Frenamos el envío
            evento.preventDefault();

            // Limpiamos mensajes anteriores
            const camposParaLimpiar = ['nombre', 'email', 'password', 'avatar'];
            camposParaLimpiar.forEach(id => {
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