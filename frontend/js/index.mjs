const boton = document.querySelector('.menu-hamburguesa');
const cabecera = document.querySelector('.cabecera-principal');
if (boton) { 
    boton.addEventListener('click', function() {
        cabecera.classList.toggle('menu-abierto');
        const estaAbierto = cabecera.classList.contains('menu-abierto');
        boton.setAttribute('aria-expanded', estaAbierto);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const contenedorEntrenamientos = document.getElementById('contenedor-entrenamientos');
    const contenedorProfesores = document.getElementById('profesores');
    const contenedorTestimonios = document.getElementById('autores-testimonios');
    try {
        const [resEntrenamientos, resProfesores, resTestimonios] = await Promise.all([
            fetch('http://localhost:3000/api/entrenamientos'),
            fetch('http://localhost:3000/api/profesores'),
            fetch('http://localhost:3000/api/testimonios')
        ]);
        const entrenamientos = await resEntrenamientos.json();
        const profesores = await resProfesores.json();
        const testimonios = await resTestimonios.json();
        contenedorEntrenamientos.innerHTML = entrenamientos.slice(0, 3).map(ent => `
            <article class="entrenamiento-contenedor">
                <img src="${ent.imagen || '/imagenes/entrenamiento-default.jpg'}" alt="Imagen ${ent.nombre}">
                <h2>${ent.nombre.toUpperCase()}</h2>
                <p>${ent.descripcion.substring(0, 120)}...</p>
                <a href="entrenamientos.html" class="boton-enlace">
                    Conoce más
                    <img src="/imagenes/flecha-derecha.png" alt="Vector flecha derecha">
                </a>
            </article>
        `).join('');
        contenedorProfesores.innerHTML = profesores.map(profe => `
            <article class="profesor">
                <img src="${profe.imagen || '/imagenes/profe-default.jpg'}" alt="Foto de ${profe.nombre}">
                <h2>${profe.nombre.toUpperCase()}</h2>
                <p>${profe.descripcion || 'Profesor Especializado en XS Training.'}</p>
            </article>
        `).join('');
        contenedorTestimonios.innerHTML = testimonios.map(test => `
            <blockquote class="cuadro-testimonio">
                <p>"${test.contenido} — ${test.autor}"</p>
            </blockquote>
        `).join('');
    } catch (error) {
        console.error('Error al cargar los datos públicos de inicio:', error);
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('planes-entrenamientos');
    try {
        const respuesta = await fetch('http://localhost:3000/api/entrenamientos');
        const entrenamientos = await respuesta.json();
        // Mapeamos e inyectamos TODOS los entrenamientos de la base de datos
        contenedor.innerHTML = entrenamientos.map(ent => `
            <article class="entrenamiento-contenedor">
                <img src="${ent.imagen || '/imagenes/entrenamiento-default.jpg'}" alt="Imagen ${ent.nombre}">
                <h2>${ent.nombre.toUpperCase()}</h2>
                <p>${ent.descripcion}</p>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error al cargar la lista completa de entrenamientos:', error);
        contenedor.innerHTML = '<p style="color: red; text-align: center;">Error al conectar con el servidor.</p>';
    }
});
document.getElementById('form-inscripcion-publico').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const txtNombre = document.getElementById('text-nombre').value;
    const txtApellido = document.getElementById('text-apellido').value;
    const txtDni = document.getElementById('text-dni').value;
    const txtTelefono = document.getElementById('tel-numero').value;
    const txtCorreo = document.getElementById('email-correo').value;
    const mensajeAlerta = document.getElementById('mensaje-inscripcion');
    const datos = {
        nombre: txtNombre,
        apellido: txtApellido,
        dni: txtDni,
        numtelefono: txtTelefono, 
        correo: txtCorreo
    };
    console.log(datos)
    try {
        const respuesta = await fetch('http://localhost:3000/api/inscripciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        const resultado = await respuesta.json();
        if (respuesta.ok) {
            mensajeAlerta.style.display = 'block';
            mensajeAlerta.style.color = '#5cb85c'; 
            mensajeAlerta.innerText = resultado.mensaje;
            e.target.reset(); 
        } else {
            mensajeAlerta.style.display = 'block';
            mensajeAlerta.style.color = '#ff4d4d'; 
            mensajeAlerta.innerText = resultado.error || 'Error al procesar.';
        }
    } catch (err) {
        mensajeAlerta.style.display = 'block';
        mensajeAlerta.style.color = '#ff4d4d';
        mensajeAlerta.innerText = 'Error de conexión con el servidor.';
    }
});