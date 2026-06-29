const API = "http://localhost:3000/api";

export async function obtener(entidad) {
    const respuesta = await fetch(`${API}/${entidad}`, {
        credentials: "include"
    });
    if (!respuesta.ok) {
        throw new Error(`Error al obtener ${entidad}`);
    }
    return await respuesta.json();
}

export async function crear(entidad, datos) {
    const respuesta = await fetch(`${API}/${entidad}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
    if (!respuesta.ok) {
        throw new Error(`Error al crear ${entidad}`);
    }
    return await respuesta.json();
}

export async function actualizar(entidad, id, datos) {
    const respuesta = await fetch(`${API}/${entidad}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
    if (!respuesta.ok) {
        throw new Error(`Error al actualizar ${entidad}`);
    }
    return await respuesta.json();
}

export async function eliminar(entidad, id) {
    const respuesta = await fetch(`${API}/${entidad}/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!respuesta.ok) {
        throw new Error(`Error al eliminar ${entidad}`);
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