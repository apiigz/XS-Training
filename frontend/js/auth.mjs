const API = "http://localhost:3000/api";

export async function login(correo, password) {
    const respuesta = await fetch(`${API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo,
            password
        })
    });
    const datos = await respuesta.json();
    return {
        ok: respuesta.ok,
        status: respuesta.status,
        datos
    };
}

export async function registrar(correo, password) {
    const respuesta = await fetch(`${API}/auth/registrar`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo,
            password
        })
    });
    const datos = await respuesta.json();
    return {
        ok: respuesta.ok,
        status: respuesta.status,
        datos
    };
}

export async function verificarSesion() {
    const respuesta = await fetch(`${API}/auth/verificar`, {
        method: "GET",
        credentials: "include"
    });
    const datos = await respuesta.json();
    return {
        ok: respuesta.ok,
        status: respuesta.status,
        datos
    };
}

export async function logout() {
    const respuesta = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    const datos = await respuesta.json();
    return {
        ok: respuesta.ok,
        status: respuesta.status,
        datos
    };
}