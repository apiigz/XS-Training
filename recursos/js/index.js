import { obtenerDatos } from "./servicios.js"
import { renderizarEntrenamientos, renderizarProfesores, renderizarTestimonios, renderizarCambioContraseña, renderizarRegistro, renderizarLogin, funcionalidadesLogin, enviarInscripcion, enviarExperiencia } from "./vista.js"

//Renderizar Profesores
const contenedorProfesores = document.getElementById('profesores')
if (contenedorProfesores) {
    const profesores = await obtenerDatos('./datos/profesores.json');
    renderizarProfesores(profesores, contenedorProfesores)
}

//Renderizar Entrenamientos 
const contenedorEntrenamientos = document.getElementById('planes-entrenamientos')
if (contenedorEntrenamientos) {
    const entrenamientos = await obtenerDatos('./datos/entrenamientos.json');
    renderizarEntrenamientos(entrenamientos, contenedorEntrenamientos)
}

//Renderizar testimonios
const contenedorTestimonios = document.getElementById('autores-testimonios')
if(contenedorTestimonios){
    const testimonios = await obtenerDatos('./datos/experiencias.json')
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