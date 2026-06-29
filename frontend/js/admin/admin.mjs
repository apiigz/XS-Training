import { cargarEntrenamientos } from "./entrenamientos.mjs";
import { cargarProfesores } from "./profesores.mjs";
import { cargarInscripciones } from "./inscripciones.mjs";
import { cargarTestimonios } from "./testimonios.mjs";
import { cargarSuscripciones } from "./suscripciones.mjs";
import { cargarClases } from "./clases.mjs";
import { cargarReservas } from "./reservas.mjs";
import * as api from "./apiAdmin.mjs"
console.log('se cargo')
document.addEventListener("DOMContentLoaded", ()=>{
    const panel =
        document.getElementById("lista-usuarios-admin");
    if(!panel){
        console.error("No existe el panel.");
        return;
    }
    const botones={
        entrenamientos:
            document.getElementById("btn-nav-entrenamientos"),
        profesores:
            document.getElementById("btn-nav-profesores"),
        inscripciones:
            document.getElementById("btn-nav-inscripciones"),
        testimonios:
            document.getElementById("btn-nav-testimonios"),
        suscripciones:
            document.getElementById("btn-nav-suscripciones"),
        clases:
            document.getElementById("btn-nav-clases"),
        reservas:
            document.getElementById("btn-nav-reservas")
    };
botones.entrenamientos?.addEventListener("click", (e) => {
    e.preventDefault();
    cargarEntrenamientos(panel);
});
    botones.profesores?.addEventListener("click", (e) => {
    e.preventDefault();
    cargarProfesores(panel);
});
    botones.inscripciones?.addEventListener(
        "click",
        ()=>cargarInscripciones(panel)
    );
    botones.testimonios?.addEventListener(
        "click",
        ()=>cargarTestimonios(panel)
    );
    botones.suscripciones?.addEventListener(
        "click",
        ()=>cargarSuscripciones(panel)
    );
    botones.clases?.addEventListener(
        "click",
        ()=>cargarClases(panel)
    );
    botones.reservas?.addEventListener(
        "click",
        ()=>cargarReservas(panel)
    );
});
const btnCerrarSesion =
    document.getElementById("boton-cerrar-sesion");
btnCerrarSesion?.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        await api.logout(); 
        window.location.href = "/index.html";
    }
    catch (error) {
        console.error(error);
        alert("No se pudo cerrar la sesión.");
    }
});