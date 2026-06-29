import * as api from "./apiDashboard.mjs";

export async function cargarMisReservas() {
    const contenedor = document.getElementById(
        "lista-mis-reservas"
    );
    try {
        const reservas =
            await api.obtenerMisReservas();
        contenedor.replaceChildren();
        if (reservas.length === 0) {
            const mensaje =
                document.createElement("p");
            mensaje.style.color = "gray";
            mensaje.textContent =
                "No tenés reservas agendadas.";
            contenedor.append(mensaje);
            return;
        }
        reservas.forEach(reserva => {
            const tarjeta =
                crearTarjeta(reserva);
            contenedor.append(tarjeta);
        });
    }
    catch (error) {
        console.error(error);
        contenedor.innerHTML = `
            <p style="color:red">
                No fue posible cargar tus reservas.
            </p>
        `;
    }
}
function crearTarjeta(reserva) {
    const card = document.createElement("article");
    card.style.backgroundColor = "#1b1b1b";
    card.style.border = "1px solid #333";
    card.style.borderRadius = "8px";
    card.style.padding = "15px";
    card.style.marginBottom = "15px";
    const entrenamiento =
        document.createElement("h3");
    entrenamiento.textContent =
        reserva.entrenamiento;
    const profesor =
        document.createElement("p");
    profesor.textContent =
        `Profesor: ${reserva.profesor}`;
    const fecha =
        document.createElement("p");
    fecha.textContent =
        `Fecha: ${reserva.fecha}`;
    const hora =
        document.createElement("p");
    hora.textContent =
        `Hora: ${reserva.hora}`;
    const estado =
        document.createElement("p");
    estado.textContent =
        `Estado: ${reserva.estado}`;
    estado.style.color =
        "yellow";
    card.append(
        entrenamiento,
        profesor,
        fecha,
        hora,
        estado
    );
    return card;
}