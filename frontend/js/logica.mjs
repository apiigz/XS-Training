import { obtenerDatos, obtenerEntrenamientos, obtenerProfesores, obtenerTestimonios } from "./servicios.js"
import { renderizarEntrenamientos, renderizarProfesores, renderizarTestimonios, renderizarLogin, enviarInscripcion, enviarExperiencia } from "./vista.js"

const boton = document.querySelector('.menu-hamburguesa');
const cabecera = document.querySelector('.cabecera-principal');

if (boton) { // Añadir una comprobación de seguridad
    boton.addEventListener('click', function() {
        cabecera.classList.toggle('menu-abierto');
        
        const estaAbierto = cabecera.classList.contains('menu-abierto');
        boton.setAttribute('aria-expanded', estaAbierto);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('cuadro-acceso');
    console.log(contenedor)
    
    if (contenedor) {
        console.log('Contenedor para login encontrado, renderizando login...');
        renderizarLogin(contenedor);

        const formulario = document.getElementById('form-login');
        const mensajeError = document.getElementById('mensaje-error');

        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const correo = document.getElementById('login-email').value;
            const contrasena = document.getElementById('login-contrasena').value;
            console.log('Intentando iniciar sesión con:', { correo, contrasena });

            try {
                const respuesta = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correo, contrasena }) 
                });

                const datos = await respuesta.json();
                console.log('Respuesta del servidor:', datos);

                if (!respuesta.ok) {
                    mensajeError.innerText = datos.error || 'Error al iniciar sesión';
                    mensajeError.style.display = 'block';
                    return;
                }

                localStorage.setItem('usuarioLogueado', JSON.stringify(datos.usuario));

                if (datos.usuario.rol === 'admin') {
                    window.location.href = 'dashboard-admin.html'; 
                } else {
                    window.location.href = 'perfil-cliente.html';  
                }

            } catch (error) {
                console.error('Error de red al intentar el login:', error);
                mensajeError.innerText = 'No se pudo conectar con el servidor del gimnasio.';
                mensajeError.style.display = 'block';
            }
        });
    }
    else{
        console.log('No se encontró el contenedor para el login');
    }

    const formPublico = document.getElementById('form-inscripcion-publico');
if (formPublico) {
    const msg = document.getElementById('mensaje-inscripcion');

    formPublico.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Armamos el JSON directo con las propiedades limpias que espera Postgres
        const datosInscripcion = {
            nombre: document.getElementById('text-nombre').value.trim(),
            apellido: document.getElementById('text-apellido').value.trim(),
            dni: document.getElementById('text-dni').value.trim(),
            telefono: document.getElementById('tel-numero').value.trim(),
            correo: document.getElementById('email-correo').value.trim()
        };

        try {
            const respuesta = await fetch('http://localhost:3000/api/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosInscripcion)
            });

            if (respuesta.ok) {
                msg.innerText = '¡Inscripción enviada con éxito! Pronto te asignaremos una cuenta.';
                msg.style.color = '#5cb85c'; // Verde éxito
                msg.style.display = 'block';
                formPublico.reset(); // Vacía el formulario
            } else {
                const err = await respuesta.json();
                msg.innerText = err.error || 'Hubo un problema al procesar tu inscripción.';
                msg.style.color = '#ff4d4d';
                msg.style.display = 'block';
            }
        } catch (error) {
            msg.innerText = 'Error de conexión con el servidor.';
            msg.style.color = '#ff4d4d';
            msg.style.display = 'block';
        }
    });
}
});

//Renderizar Profesores
const contenedorProfesores = document.getElementById('profesores')
if (contenedorProfesores) {
    const profesores = await obtenerProfesores();
    renderizarProfesores(profesores, contenedorProfesores)
}

//Renderizar Entrenamientos 
const contenedorEntrenamientos = document.getElementById('planes-entrenamientos')
if (contenedorEntrenamientos) {
    const entrenamientos = await obtenerEntrenamientos();
    renderizarEntrenamientos(entrenamientos, contenedorEntrenamientos)
}

//Renderizar testimonios
const contenedorTestimonios = document.getElementById('autores-testimonios')
if(contenedorTestimonios){
    const testimonios = await obtenerTestimonios();
    renderizarTestimonios(testimonios, contenedorTestimonios)
    console.log(testimonios)
}
console.log(contenedorTestimonios)

//Renderizar login (siempre se verá esto primero)
/*const contenedorLogin = document.getElementById('cuadro-acceso')
if (contenedorLogin){
    renderizarLogin(contenedorLogin)
}*/


//Darle función al botón submit de inscripción
const botonEnviarInscripcion = document.getElementById('boton-enviar-inscripcion')
if(botonEnviarInscripcion){
    botonEnviarInscripcion.addEventListener('click', function(e){
        e.preventDefault()
        enviarInscripcion()
    })
}

//Darle función al botón submit de experiencia
const botonEnviarExperiencia = document.getElementById('enviar-experiencia')
if(botonEnviarExperiencia){
    botonEnviarExperiencia.addEventListener('click', function(e){
        e.preventDefault()
        enviarExperiencia()
    })
}