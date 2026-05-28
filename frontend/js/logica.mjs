import { obtenerDatos, obtenerEntrenamientos, obtenerProfesores, obtenerTestimonios } from "./servicios.js"
import { renderizarEntrenamientos, renderizarProfesores, renderizarTestimonios, renderizarCambioContraseña, renderizarRegistro, renderizarLogin, funcionalidadesLogin, enviarInscripcion, enviarExperiencia } from "./vista.js"

const boton = document.querySelector('.menu-hamburguesa');
console.log(boton);
const cabecera = document.querySelector('.cabecera-principal');

if (boton) { // Añadir una comprobación de seguridad
    boton.addEventListener('click', function() {
        cabecera.classList.toggle('menu-abierto');
        
        const estaAbierto = cabecera.classList.contains('menu-abierto');
        boton.setAttribute('aria-expanded', estaAbierto);
    });
}

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
const contenedorLogin = document.getElementById('cuadro-acceso')
if (contenedorLogin){
    renderizarLogin(contenedorLogin)
}


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