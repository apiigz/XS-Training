import * as api from "./apiDashboard.mjs";

export async function cargarEstadoCuenta() {
    const estado = document.getElementById(
        "suscripcion-estado"
    );
    const vencimiento = document.getElementById(
        "suscripcion-vencimiento"
    );
    try {
        const suscripcion =
            await api.obtenerMiSuscripcion();
        if (!suscripcion) {
            estado.textContent =
                "Sin suscripción activa.";
            vencimiento.textContent =
                "--/--/----";
            return;
        }
        estado.textContent =
            suscripcion.estado;
        const fecha =
            new Date(suscripcion.fechavencimiento);
        vencimiento.textContent =
            fecha.toLocaleDateString("es-AR");
    }
    catch (error) {
        console.error(error);
        estado.textContent =
            "No fue posible cargar la información.";
        vencimiento.textContent =
            "--/--/----";
    }
}