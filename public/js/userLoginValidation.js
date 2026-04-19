window.addEventListener('load', function() {
    
    const formulario = document.querySelector('#loginForm');
    const campoEmail = document.querySelector('#email');
    const campoPassword = document.querySelector('#password');

    formulario.addEventListener('submit', function(evento) {
        
        let errores = [];

        // --- VALIDACIÓN: EMAIL ---
        const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (campoEmail.value.trim() === "") {
            errores.push({ campo: 'email', mensaje: 'El correo electrónico es obligatorio' });
        } else if (!reEmail.test(campoEmail.value)) {
            errores.push({ campo: 'email', mensaje: 'Debes ingresar un formato de correo válido' });
        }

        // --- VALIDACIÓN: PASSWORD ---
        if (campoPassword.value.trim() === "") {
            errores.push({ campo: 'password', mensaje: 'La contraseña no puede estar vacía' });
        }

        // --- CONTROL DE ERRORES ---
        if (errores.length > 0) {
            evento.preventDefault();

            // Limpiar errores previos
            const camposParaLimpiar = ['email', 'password'];
            camposParaLimpiar.forEach(id => {
                const p = document.querySelector(`#error-${id}`);
                if (p) p.style.display = 'none';
            });

            // Mostrar nuevos errores
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