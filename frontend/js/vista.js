import { obtenerUsuarios, guardarUsuario, register, obtenerInscripciones, guardarInscripcion, obtenerExperiencias, guardarExperiencia } from "./db/db.js";

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
        
        <form id="form-login" class="datos-acceso">
            
            <article class="login">
                <label for="login-email">
                    USUARIO O CORREO
                    <input type="email" name="mail" id="login-email" required placeholder="ejemplo@gym.com">
                </label>
            </article>
            
            <article class="login">
                <label for="login-contrasena">
                    CONTRASEÑA
                    <input type="password" name="contrasena" id="login-contrasena" required placeholder="******">
                </label>
            </article>

            <p id="mensaje-error" style="color: #ff4d4d; display: none; text-align: center; font-weight: bold; margin: 10px 0; font-size: 14px;"></p> 
            
            <button type="submit" id="boton-login" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #555; border-radius: 4px; background-color: yellow; color: black; cursor: pointer; font-family: 'gym-font'; font-size: 16px;">
                Iniciar sesión
            </button>
            
        </form>
    </section>
    `
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

//PARTE ADMINISTRATIVA 

//Al fina cree otro archivo

export {renderizarEntrenamientos, renderizarProfesores, renderizarTestimonios, renderizarLogin, enviarInscripcion, enviarExperiencia};
