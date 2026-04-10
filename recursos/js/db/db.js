//Consultas al archivo .JSON
function obtenerUsuarios(){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

//Escribir en el archivo .JSON los datos ingresados por el usuario
function guardarUsuario(arregloUsuarios){
    localStorage.setItem("usuarios", JSON.stringify(arregloUsuarios));
}

//Login
function login(correoElemento, contraseñaElemento){
    const correo = correoElemento.value
    const contraseña = contraseñaElemento.value

    let usuarios = obtenerUsuarios()

    const usuarioEncontrado = usuarios.find(
        u => u.mail === correo && u.contraseña === contraseña
    );
    if (!usuarioEncontrado){
        alert('Usuario o contraseña incorrecta')
        return;
    }
    else{
        console.log(`Bienvenido ${usuarioEncontrado.mail}`)
    }
    const contenedor = document.getElementById('cuadro-acceso')
    if(usuarioEncontrado.tipoUsuario === 'usuario'){
        renderizarInterfazUsuario(contenedor)
    }
    else{
        renderizarInterfazAdmin(contenedor)
    }
}

//Register
function register(correoElemento, contraseñaElemento, repetirContraseñaElemento){
    const mail = correoElemento.value
    const contraseña = contraseñaElemento.value
    const contraseñaRepetir = repetirContraseñaElemento.value
    const tipoUsuario = 'usuario'

    if (contraseñaRepetir != contraseña){
        alert("Las contraseñas no coinciden, vuelva a intentarlo")
        return;
    }

    let usuarios = obtenerUsuarios()

    if(usuarios.some(u => u.mail === mail)){
        alert("El correo ya está registrado")
        return;
    }

    usuarios.push({ mail: mail, contraseña: contraseña, tipoUsuario: tipoUsuario });
    guardarUsuario(usuarios);

    alert("Registro éxitoso")
}

function renderizarInterfazUsuario(contenedor){
    const renderizar = `
    <section class="cuadro-acceso">
        <h1>MI CUENTA</h1> 
        <label for="boton-cronograma">
            MIS TURNOS
            <button type="button" id="boton-cronograma">Cronograma</button>
        </label>
        <label for="boton-reservas">
            MIS RESERVAS
            <button type="button" id="boton-reservas">Reservas</button>
        </label>
        <label for="boton-pagos">
            ESTADO DE CUENTA
            <button type="button" id="boton-pagos">Pagos efectuados y pendientes</button>
        </label>
        <a href="" id="cerrar-sesion">Cerrar sesión</a> 
    </section>
    `

    contenedor.innerHTML = renderizar
}

function renderizarInterfazAdmin(contenedor){
    const renderizar = `
    <section class="cuadro-acceso">
        <h1>ADMINISTRADOR</h1> 
        <label for="boton-cronograma">
            CAMBIAR CRONOGRAMA GENERAL O INDIVIDUAL
            <button type="button" id="boton-cronograma">Cronograma</button>
        </label>
        <label for="boton-reservas">
            RESERVAS
            <button type="button" id="boton-reservas">Reservas</button>
        </label>
        <label for="boton-pagos">
            ESTADO DE CUENTAS
            <button type="button" id="boton-pagos">Pagos efectuados y pendientes</button>
        </label>
        <label for="boton-profesores">
            ADMINISTRAR PROFESORES
            <button type="button" id="boton-profesores">Cambiar datos de los profesores</button>
        </label>
        <label for="boton-entrenamientos">
            ADMINISTRAR ENTRENAMIENTOS MOSTRADOS
            <button type="button" id="boton-profesores">Cambiar datos de los entrenamientos</button>
        </label>
        <a href="" id="cerrar-sesion">Cerrar sesión</a> 
    </section>
    `

    contenedor.innerHTML = renderizar
}

//INSCRITOS - - - - - -  - - - - -

//Consultas al archivo .JSON
function obtenerInscripciones(){
    return JSON.parse(localStorage.getItem("inscripciones")) || [];
}

//Escribir en el archivo .JSON los datos ingresados por el usuario
function guardarInscripcion(arregloInscripciones){
    localStorage.setItem("inscripciones", JSON.stringify(arregloInscripciones));
}

//EXPERIENCIAS - - - - - -  - - - -----
function obtenerExperiencias(){
    return JSON.parse(localStorage.getItem("experiencias")) || [];
}

//Escribir en el archivo .JSON los datos ingresados por el usuario
function guardarExperiencia(arregloExperiencias){
    localStorage.setItem("experiencias", JSON.stringify(arregloExperiencias));
}
export{obtenerUsuarios, guardarUsuario, login, register, obtenerInscripciones, guardarInscripcion, obtenerExperiencias, guardarExperiencia}