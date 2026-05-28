import { obtenerUsuarios, guardarUsuario, login, register, obtenerInscripciones, guardarInscripcion, obtenerExperiencias, guardarExperiencia } from "./db/db.js";

//Renderizar entrenamientos (entrenamientos.json)
function renderizarEntrenamientos(arregloEntrenamientos, contenedor){
    let cadenaVacia = ''

    arregloEntrenamientos.forEach(entrenamiento => {
        const plantilla = `
        <article class="${entrenamiento.plan}"> 
            <img src=${entrenamiento.imagen} alt="${entrenamiento.alt}">
            <div class="texto-plan">
                <h1>${entrenamiento.nombre}</h1>
                <p>${entrenamiento.descripcion}</p>
            </div>
        </article>
        `

        cadenaVacia += plantilla
    });

    contenedor.innerHTML = cadenaVacia;
};

//Renderizar profesores
function renderizarProfesores(arregloProfesores, contenedor){
    let cadenaVacia = ''

    arregloProfesores.forEach(profesor =>{
        const plantilla=`
        <article class="profesor">
            <img src=${profesor.imagen} alt=${profesor.alt}>
            <h2>
                ${profesor.nombre}                
            </h2>
            <p>
                ${profesor.descripcion}
            </p>
        </article>
        `

        cadenaVacia += plantilla
    })

    contenedor.innerHTML = cadenaVacia;
};

//Renderizar testimonios
function renderizarTestimonios(arregloTestimonios, contenedor){
    let cadenaVacia = ''

    arregloTestimonios.forEach(testimonio =>{
        const plantilla = `
        <article class="cuadro-testimonio">
            <p>${testimonio.mensaje}<br>${testimonio.autor}</p>
        </article>
        `

        cadenaVacia += plantilla
    })

    contenedor.innerHTML = cadenaVacia
}

//Renderizar login
function renderizarLogin(contenedor){
    contenedor.innerHTML = `
    <section class="cuadro-acceso">
        <h1>MI CUENTA</h1>
        <form action="/acceso.html" method="post" id="form-login">
            <article class="login">
                <label for="login-email">
                    USUARIO O CORREO
                    <input type="email" name="mail" id="login-email">
                </label>
            </article>
            <article class="login">
                <label for="login-contraseña">
                    CONTRASEÑA
                    <input type="password" name="contraseña" id="login-contraseña">
                </label>
            </article>
            <button type="button" id="boton-login">
                Iniciar sesión
            </button>
            <p>¿No tenés una cuenta aún?</p>
            <a href="" id="registro">Registrarse</a> 
            <a href="" id="cambiar-contraseña">Olvidé mi contraseña</a> 
        </form>
    </section>
    `

    const botonRegistrarse = document.getElementById("registro")
    botonRegistrarse.addEventListener('click', function(e){
        e.preventDefault()
        renderizarRegistro(contenedor);
    })

    const botonCambiarContraseña = document.getElementById("cambiar-contraseña")
    botonCambiarContraseña.addEventListener('click', function(e){
        e.preventDefault()
        renderizarCambioContraseña(contenedor)
    })

    funcionalidadesLogin();
}

//Renderizar registro
function renderizarRegistro(contenedor){
    contenedor.innerHTML = `
    <section class="cuadro-acceso">
        <h1>MI CUENTA</h1>
        <form action="/acceso.html" method="post">
            <article class="login">
                <label for="register-email">
                    USUARIO O CORREO
                    <input type="email" name="mail" id="register-email">
                </label>
            </article>
            <article class="login">
                <label for="register-contraseña">
                    CONTRASEÑA
                    <input type="password" name="contraseña" id="register-contraseña">
                </label>
            </article>
            <article class="login">
                <label for="register-contraseña-repetir">
                    REPETIR CONTRASEÑA
                    <input type="password" name="contraseña-repetir" id="register-contraseña-repetir">
                </label>
            </article>
            <button type="button" id="boton-registrar">
                Crear cuenta
            </button>
            <p>¿Ya tenés una cuenta?</p>
            <a href="" id="login">Iniciar sesión</a> 
            <a href="" id="cambiar-contraseña">Olvidé mi contraseña</a> 
        </form>
    </section>
    `

    const botonLogin = document.getElementById('login')
    botonLogin.addEventListener('click', function(e){
        e.preventDefault()
        renderizarLogin(contenedor)
    })

    const botonCambiarContraseña = document.getElementById('cambiar-contraseña')
    botonCambiarContraseña.addEventListener('click', function(e){
        e.preventDefault()
        renderizarCambioContraseña(contenedor)
    })

    funcionalidadesRegister()
}

//Renderizar recuperación de contraseña
function renderizarCambioContraseña(contenedor){
    contenedor.innerHTML = `
    <section class="cuadro-acceso">
        <h1>MI CUENTA</h1>
        <form action="/acceso.html" method="post">
            <article class="login">
                <label for="login-email">
                    USUARIO O CORREO
                    <input type="email" name="mail" id="login-email">
                </label>
            </article>
            <article class="login">
                <label for="cambio-contraseña">
                    NUEVA CONTRASEÑA
                    <input type="password" name="contraseña" id="cambio-contraseña">
                </label>
            </article>
            <article class="login">
                <label for="cambio-contraseña-repetir">
                    REPETIR NUEVA CONTRASEÑA
                    <input type="password" name="contraseña-repetir" id="cambio-contraseña-repetir">
                </label>
            </article>
            <button type="button" id="boton-cambiar-contraseña">
                Cambiar contraseña
            </button>
            <p>¿Querés registrarte o ya tenés una cuenta?</p>
            <a href="" id="registro">Registrarse</a> 
            <a href="" id="login">Iniciar sesión</a> 
        </form>
    </section>
    `

    const botonRegistrarse = document.getElementById('registro')
    botonRegistrarse.addEventListener('click', function(e){
        e.preventDefault()
        renderizarRegistro(contenedor)
    })

    const botonLogin = document.getElementById('login')
    botonLogin.addEventListener('click', function(e){
        e.preventDefault()
        renderizarLogin(contenedor)
    })
}

function funcionalidadesLogin(){
    const campoUsuario = document.getElementById("login-email")
    const campoContraseña = document.getElementById("login-contraseña")

    const formularioLogin = document.getElementById("form-login")

    const botonLoginButton = document.getElementById("boton-login")
    botonLoginButton.addEventListener('click', () =>{
        login(campoUsuario, campoContraseña)
    })
}

function funcionalidadesRegister(){
    const campoUsuario = document.getElementById('register-email')
    const campoContraseña = document.getElementById('register-contraseña')
    const campoRepetirContraseña = document.getElementById('register-contraseña-repetir')

    const botonRegisterButton = document.getElementById("boton-registrar")
    botonRegisterButton.addEventListener('click', () =>{
        register(campoUsuario, campoContraseña, campoRepetirContraseña)
    })
}

//Guardar la inscripción, es de inscripcion.html
function enviarInscripcion(){
    const nombre = document.getElementById('text-nombre').value
    const apellido = document.getElementById('text-apellido').value
    const dni = document.getElementById('text-dni').value
    const numero = document.getElementById('tel-numero').value
    const mail = document.getElementById('email-correo').value

    let inscripciones = obtenerInscripciones()

    if(inscripciones.some(u => u.numero === numero)){
        alert("El número ya está registrado")
        return;
    }
    if(inscripciones.some(u => u.mail === mail)){
        alert("El correo ya está registrado")
        return;
    }

    inscripciones.push({ nombre: nombre, apellido: apellido, dni: dni, numero: numero, mail: mail });
    guardarInscripcion(inscripciones);

    console.log(inscripciones)

    alert("¡Gracias por inscribirte!")
}

//Guardar la experiencia, es de contacto.html
function enviarExperiencia(){
    const experiencia = document.getElementById('id-experiencia').value

    let experiencias = obtenerExperiencias()

    experiencias.push({mensaje: experiencia})

    guardarExperiencia(experiencia)

    console.log(experiencias)

    alert("¡Gracias por mandarnos tu experiencia! Nos ayuda mucho a mejorar")
}

export {renderizarEntrenamientos, renderizarProfesores, renderizarTestimonios, renderizarCambioContraseña, renderizarRegistro, renderizarLogin, enviarInscripcion, enviarExperiencia, funcionalidadesLogin}
