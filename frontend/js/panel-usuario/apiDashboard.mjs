const API = "/api";

export async function obtenerMiSuscripcion() {
    const respuesta = await fetch(
        `${API}/mi-suscripcion`,
        {
            credentials: "include"
        }
    );
    if (!respuesta.ok) {
        throw new Error(
            "Error al obtener la suscripción."
        );
    }
    return await respuesta.json();
}

export async function obtenerMisReservas() {
    const respuesta = await fetch(
        `${API}/mis-reservas`,
        {
            credentials: "include"
        }
    );
    if (!respuesta.ok) {
        throw new Error(
            "Error al obtener las reservas."
        );
    }
    return await respuesta.json();
}

export async function obtenerClasesDisponibles() {
    const respuesta = await fetch(
        `${API}/clases-disponibles`,
        {
            credentials: "include"
        }
    );
    if (!respuesta.ok) {
        throw new Error(
            "Error al obtener las clases."
        );
    }
    return await respuesta.json();
}

export async function reservarClase(idClase) {
    const respuesta = await fetch(
        `${API}/reservar`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idClase
            })
        }
    );
    if (!respuesta.ok) {
        throw new Error(
            "No fue posible reservar la clase."
        );
    }
    return await respuesta.json();
}
export async function logout() {
    const respuesta = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });
    if (!respuesta.ok) {
        throw new Error("No se pudo cerrar la sesión.");
    }
}