import { cargarEstadoCuenta } from "./cuenta.mjs";
import { cargarMisReservas } from "./reservas.mjs";

import * as api from "./apiDashboard.mjs"

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await cargarEstadoCuenta();
        await cargarMisReservas();
        configurarAgenda();
    }
    catch (error) {
        console.error(error);
    }
});
function configurarAgenda() {
    const botonAgenda = document.getElementById(
        "btn-ver-agenda"
    );
    if (!botonAgenda)
        return;
    botonAgenda.addEventListener("click", () => {
        alert(
            "La agenda de reservas se encuentra en desarrollo."
        );
    });
}
const btnCerrarSesion =
    document.getElementById("boton-cerrar-sesion-cliente");
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