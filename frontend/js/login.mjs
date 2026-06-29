import {login, registrar, verificarSesion} from "./auth.mjs";

function renderizarLogin(contenedor) {
    contenedor.innerHTML = `
    <section class="cuadro-acceso">
        <h1>MI CUENTA</h1>
        <form id="form-login" class="datos-acceso">
            <article class="login">
                <label>
                    CORREO
                    <input
                        id="correo-login"
                        type="email"
                        required
                        placeholder="ejemplo@gym.com">
                </label>
            </article>
            <article class="login">
                <label>
                    CONTRASEÑA
                    <input
                        id="password-login"
                        type="password"
                        required>
                </label>
            </article>
            <p
                id="mensaje-login"
                style="display:none;color:red;">
            </p>
            <button type="submit">
                Iniciar sesión
            </button>
            <p>
                ¿No tenes una cuenta?
                <span
                    id="mostrar-registro"
                    style="cursor:pointer; color:yellow;">
                    <br>
                    Registrarse
                </span>
            </p>
        </form>
    </section>
    `;
    configurarLogin(contenedor);
}

function renderizarRegistro(contenedor){
    contenedor.innerHTML = `
    <section class="cuadro-acceso">
        <h1>REGISTRO</h1>
        <form id="form-registro">
            <label>
            CORREO
            <input
                id="correo-registro"
                type="email"
                placeholder="Correo"
                required>
            </label>
            <label>
            CONTRASEÑA
            <input
                id="password-registro"
                type="password"
                placeholder="Contraseña"
                required>
            </label>
            <p
                id="mensaje-registro"
                style="display:none;color:red;">
            </p>
            <button type="submit">
                Registrarme
            </button>
            <p>
                ¿Ya tenes una cuenta?
                <span
                    id="mostrar-login"
                    style="cursor:pointer;color:yellow;">
                    <br>
                    Iniciar sesión
                </span>
            </p>
        </form>
    </section>
    `;
    configurarRegistro(contenedor);
}

function configurarLogin(contenedor){
    document
        .getElementById("mostrar-registro")
        .addEventListener("click", () => {
            renderizarRegistro(contenedor);
        });
    document
        .getElementById("form-login")
        .addEventListener("submit", iniciarSesion);
}

function configurarRegistro(contenedor){
    document
        .getElementById("mostrar-login")
        .addEventListener("click", () => {
            renderizarLogin(contenedor);
        });
    document
        .getElementById("form-registro")
        .addEventListener("submit", registrarUsuario);
}
async function iniciarSesion(e){
    e.preventDefault();
    const correo =
        document.getElementById("correo-login").value.trim();
    const password =
        document.getElementById("password-login").value;
    const mensaje =
        document.getElementById("mensaje-login");
    mensaje.style.display = "none";
    try{
        const respuesta =
            await login(correo, password);
        if(!respuesta.ok){
            mensaje.innerText =
                respuesta.datos.mensaje;
            mensaje.style.display = "block";
            return;
        }
        redirigirSegunRol(
            respuesta.datos.usuario.idrol
        );
    }
    catch(error){
        console.error(error);
        mensaje.innerText =
            "No se pudo conectar con el servidor.";
        mensaje.style.display = "block";
    }
}

async function registrarUsuario(e){
    e.preventDefault();
    const correo =
        document.getElementById("correo-registro").value.trim();
    const password =
        document.getElementById("password-registro").value;
    const mensaje =
        document.getElementById("mensaje-registro");
    mensaje.style.display = "none";
    try{
        const respuesta =
            await registrar(correo, password);
        if(!respuesta.ok){
            mensaje.innerText =
                respuesta.datos.mensaje;
            mensaje.style.display = "block";
            return;
        }
        alert("Usuario registrado correctamente.");
        renderizarLogin(
            document.getElementById("cuadro-acceso")
        );
    }
    catch(error){
        console.error(error);
        mensaje.innerText =
            "No se pudo conectar con el servidor.";
        mensaje.style.display = "block";
    }
}

function redirigirSegunRol(idrol){
    if(Number(idrol) === 1){
        window.location.href =
            "dashboard-admin.html";
    }
    else{
        window.location.href =
            "perfil-cliente.html";
    }
}

document.addEventListener("DOMContentLoaded", async ()=>{
    const contenedor =
        document.getElementById("cuadro-acceso");
    if(!contenedor){
        console.error(
            'No existe #cuadro-acceso'
        );
        return;
    }
    try{
        const respuesta =
            await verificarSesion();
        if(
            respuesta.ok &&
            respuesta.datos.logueado
        ){
            redirigirSegunRol(
                respuesta.datos.usuario.idrol
            );
            return;
        }
    }
    catch(error){
        console.error(error);
    }
    renderizarLogin(contenedor);
});