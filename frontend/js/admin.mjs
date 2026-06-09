import {renderizarAdminEntrenamientos, inicializarEntrenamientos, 
    renderizarAdminProfesores, inicializarProfesores, 
    renderizarAdminInscripciones, inicializarInscripciones,
    renderizarAdminTestimonios, inicializarTestimonios,
renderizarAdminSuscripciones, inicializarSuscripciones,
renderizarAdminClases, inicializarClases,
renderizarAdminReservas, inicializarReservas} from "./renderizadoAdmin.mjs"; //=> Acordate de importar todo lo que haces en renderizadoAdmin.mjs

document.addEventListener('DOMContentLoaded', () => {
    const panelCentral = document.getElementById('lista-usuarios-admin'); 
    
    //Agrega siempre los botones de las entidades, en el panel de admin, acordate
    const btnProfesores = document.getElementById('btn-nav-profesores');
    const btnEntrenamientos = document.getElementById('btn-nav-entrenamientos');
    const btnInscripciones = document.getElementById('btn-nav-inscripciones');
    const btnTestimonios = document.getElementById('btn-nav-testimonios');
    const btnSuscripciones = document.getElementById('btn-nav-suscripciones');
    const btnClases = document.getElementById('btn-nav-clases');
    const btnReservas = document.getElementById('btn-nav-reservas');

    //Entrenamientos
    if (btnEntrenamientos) {
        btnEntrenamientos.addEventListener('click', async (e) => {
            e.preventDefault();
            panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
            
            const respuesta = await fetch('http://localhost:3000/api/entrenamientos');
            const entrenamientos = await respuesta.json();
            
            renderizarAdminEntrenamientos(panelCentral, entrenamientos);
            inicializarEntrenamientos(panelCentral);

            document.getElementById('btn-add-entrenamiento').addEventListener('click', () => {
                const lista = document.getElementById('lista-crud-entrenamientos');
                const msgVacio = lista.querySelector('.msg-vacio');
                if (msgVacio) msgVacio.remove();

                const nuevaFila = `
                    <article class="tarjeta-crud-entrenamiento" data-id="nuevo">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                            <div class="texto-plan" style="display: block;">
                                <h1 class="edit-entrenamiento-nombre" contenteditable="false" style="font-size: 24px; margin: 0; color: yellow;">Nuevo Entrenamiento</h1>
                                <p class="edit-entrenamiento-descripcion" contenteditable="false" style="font-size: 16px; color: #ccc; margin-top: 5px; line-height: 1.4;">Escribe la descripción de la actividad aquí.</p>
                            </div>
                            <div style="max-width: 350px;">
                                <img src="/imagenes/cuadro-subir-imagen.png" class="img-entrenamiento-editable" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #333; transition: opacity 0.3s ease;">
                                <input type="file" class="input-archivo-entrenamiento" accept=".webp, .png, .jpg, .jpeg" style="display: none;">
                            </div>
                        </div>
                        <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            <a href="#" class="boton-enlace btn-editar-entrenamiento" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                            <a href="#" class="boton-enlace btn-borrar-entrenamiento" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                        </div>
                    </article>
                `;
                lista.insertAdjacentHTML('afterbegin', nuevaFila);
                lista.querySelector('.btn-editar-entrenamiento').click(); // Auto-activar edición
            });
        });
    }

    // Profes
    if (btnProfesores) {
        btnProfesores.addEventListener('click', async (e) => {
            e.preventDefault();
            panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
            
            const respuesta = await fetch('http://localhost:3000/api/profesores');
            const profesores = await respuesta.json();
            
            renderizarAdminProfesores(panelCentral, profesores);
            inicializarProfesores(panelCentral);

            document.getElementById('btn-add-profesor').addEventListener('click', () => {
                const lista = document.getElementById('lista-crud-profesores');
                const msgVacio = lista.querySelector('.msg-vacio');
                if (msgVacio) msgVacio.remove();

                const nuevaFila = `
                    <article class="tarjeta-crud-profesor" data-id="nuevo">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                            <div class="texto-plan" style="display: block;">
                                <h1 class="edit-profe-nombre" contenteditable="false" style="font-size: 24px; margin: 0; color: yellow;">Nuevo Profesor</h1>
                                <p class="edit-profe-descripcion" contenteditable="false" style="font-size: 16px; color: #ccc; margin-top: 5px; line-height: 1.4;">Escribe la especialidad del profesor aquí.</p>
                            </div>
                            <div style="max-width: 350px;">
                                <img src="/imagenes/cuadro-subir-imagen.png" class="img-profe-editable" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #333; transition: opacity 0.3s ease;">
                                <input type="file" class="input-archivo-profesor" accept=".webp, .png, .jpg, .jpeg" style="display: none;">
                            </div>
                        </div>
                        <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            <a href="#" class="boton-enlace btn-editar-profesor" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                            <a href="#" class="boton-enlace btn-borrar-profesor" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                        </div>
                    </article>
                `;
                lista.insertAdjacentHTML('afterbegin', nuevaFila);
                lista.querySelector('.btn-editar-profesor').click();
            });
        });
    }

    // Inscripciones
    if (btnInscripciones) {
        btnInscripciones.addEventListener('click', async (e) => {
            e.preventDefault();
            panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
            
            const respuesta = await fetch('http://localhost:3000/api/inscripciones');
            const inscripciones = await respuesta.json();
            
            renderizarAdminInscripciones(panelCentral, inscripciones);
            inicializarInscripciones(panelCentral);

            document.getElementById('btn-add-inscripcion').addEventListener('click', () => {
                const lista = document.getElementById('lista-crud-inscripciones');
                const msgVacio = lista.querySelector('.msg-vacio');
                if (msgVacio) msgVacio.remove();

                const nuevaFila = `
                    <article class="tarjeta-crud-inscripcion" data-id="nuevo">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                            <div class="texto-plan" style="display: flex; gap: 5px; justify-content: flex-start; align-items: center;">
                                <span class="edit-ins-apellido" contenteditable="false" style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">Apellido</span>
                                <span style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">,</span>
                                <span class="edit-ins-nombre" contenteditable="false" style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">Nombre</span>
                            </div>
                            <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                                DNI: <span class="edit-ins-dni" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">DNI</span> &nbsp;|&nbsp; 
                                Tel: <span class="edit-ins-tel" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">Teléfono</span> &nbsp;|&nbsp; 
                                Correo: <span class="edit-ins-correo" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">ejemplo@gym.com</span>
                            </p>
                        </div>
                        <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            <a href="#" class="boton-enlace btn-editar-inscripcion" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                            <a href="#" class="boton-enlace btn-borrar-inscripcion" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                        </div>
                    </article>
                `;
                lista.insertAdjacentHTML('afterbegin', nuevaFila);
                lista.querySelector('.btn-editar-inscripcion').click();
            });
        });
    }

    //Testimonios
    if (btnTestimonios) {
    btnTestimonios.addEventListener('click', async (e) => {
        e.preventDefault();
        panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
        
        const respuesta = await fetch('http://localhost:3000/api/testimonios');
        const testimonios = await respuesta.json();
        
        renderizarAdminTestimonios(panelCentral, testimonios);
        inicializarTestimonios(panelCentral);

        document.getElementById('btn-add-testimonio').addEventListener('click', () => {
            const lista = document.getElementById('lista-crud-testimonios');
            const msgVacio = lista.querySelector('.msg-vacio');
            if (msgVacio) msgVacio.remove();

            const nuevaFila = `
                <article class="tarjeta-crud-testimonio" data-id="nuevo">
                    <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                        <div class="texto-plan">
                            <h1 class="edit-test-autor" contenteditable="false" style="font-size: 24px; color: yellow; margin: 0;">Nombre del Alumno</h1>
                            <p class="edit-test-contenido" contenteditable="false" style="font-size: 16px; color: white; margin-top: 5px; font-family: 'textos'; line-height: 1.4;">"Escribe la opinión aquí..."</p>
                        </div>
                    </div>
                    <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                        <a href="#" class="boton-enlace btn-editar-testimonio" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                        <a href="#" class="boton-enlace btn-borrar-testimonio" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                    </div>
                </article>
            `;
            lista.insertAdjacentHTML('afterbegin', nuevaFila);
            lista.querySelector('.btn-editar-testimonio').click();
        });
    });

    //Suscripciones
    if (btnSuscripciones) {
    btnSuscripciones.addEventListener('click', async (e) => {
        e.preventDefault();
        panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
        
        try {
            const [resSusc, resUsuarios, resEntrenamientos] = await Promise.all([
                fetch('http://localhost:3000/api/suscripciones'),
                fetch('http://localhost:3000/api/usuarios'), 
                fetch('http://localhost:3000/api/entrenamientos') //Tres consultas a la vez... Me pregunto si esto afectará el rendimiento o si Postgres las maneja bien. 
                // O si debería hacer endpoints específicos que ya vengan con los JOINs hechos para evitar esta situación.
                // Habrá que testearlo con muchos datos. Por ahora lo dejo así para no complicar el backend, pero es un punto a tener en cuenta.
                //Perdón profe si lees todos los comentarios que ponemos fjnadnjda
            ]);

            const suscripciones = await resSusc.json();
            const usuarios = await resUsuarios.json();
            const entrenamientos = await resEntrenamientos.json();
            
            renderizarAdminSuscripciones(panelCentral, suscripciones, usuarios, entrenamientos);
            inicializarSuscripciones(panelCentral);

            document.getElementById('btn-add-suscripcion').addEventListener('click', () => {
                const lista = document.getElementById('lista-crud-suscripciones');
                const msgVacio = lista.querySelector('.msg-vacio');
                if (msgVacio) msgVacio.remove();

                const hoy = new Date().toISOString().split('T')[0];

                const nuevaFila = `
                    <article class="tarjeta-crud-suscripcion" data-id="nuevo">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                            <div class="texto-plan">
                                <select class="edit-susc-usuario select-susc-dinamico" style="font-size: 18px; font-family: 'textos'; background: #3e3e3e; color: white; border: 1px solid #555; padding: 5px;">
                                    ${usuarios.map(u => `<option value="${u.id}">${u.correo}</option>`).join('')}
                                </select>
                            </div>
                            <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                                Plan: 
                                <span class="txt-susc-plan" style="display:none;"></span>
                                <select class="edit-susc-plan select-susc-dinamico" style="background: #3e3e3e; color: white; border: 1px solid #555; display:inline-block;">
                                    ${entrenamientos.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}
                                </select>
                                &nbsp;|&nbsp;
                                Monto: $<span class="edit-susc-monto" contenteditable="true" style="color: #ccc; min-width: 40px; display: inline-block; border-bottom: 1px dashed yellow;">0</span>
                                &nbsp;|&nbsp;
                                Estado: 
                                <span class="txt-susc-estado" style="display:none;">pago</span>
                                <select class="edit-susc-estado select-susc-dinamico" style="background: #3e3e3e; color: white; border: 1px solid #555; display:inline-block;">
                                    <option value="pago">pago</option>
                                    <option value="vencido">vencido</option>
                                    <option value="pendiente">pendiente</option>
                                </select>
                            </p>
                            <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                                Pago: <input type="date" class="edit-susc-fpago" value="${hoy}" style="background: transparent; color: #ccc; border-bottom: 1px dashed yellow;"> | 
                                Vence: <input type="date" class="edit-susc-fvenc" value="${hoy}" style="background: transparent; color: #ccc; border-bottom: 1px dashed yellow;">
                            </p>
                        </div>
                        <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            <a href="#" class="boton-enlace btn-editar-suscripcion" style="color: green; font-family: 'gym-font'; font-size: 16px;">CONFIRMAR</a>
                            <a href="#" class="boton-enlace btn-borrar-suscripcion" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                        </div>
                    </article>
                `;
                lista.insertAdjacentHTML('afterbegin', nuevaFila);
            });

        } catch (err) {
            panelCentral.innerHTML = '<p style="color: red;">Error al consultar catálogos relacionales.</p>';
        }
    });

    //Clases programadas
    if (btnClases) {
    btnClases.addEventListener('click', async (e) => {
        e.preventDefault();
        panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
        
        try {
            console.log('Iniciando consultas para clases programadas...');
            const [resClases, resEntrenamientos, resProfesores] = await Promise.all([
                fetch('http://localhost:3000/api/clases-programadas'),
                fetch('http://localhost:3000/api/entrenamientos'),
                fetch('http://localhost:3000/api/profesores')
            ]);

            console.log("Respuesta Clases HTTP Status:", resClases.status);
            console.log("Respuesta Entrenamientos HTTP Status:", resEntrenamientos.status);
            console.log("Respuesta Profesores HTTP Status:", resProfesores.status);

            const clases = await resClases.json();
            const entrenamientos = await resEntrenamientos.json();
            const profesores = await resProfesores.json();

            console.log("Contenido Clases:", clases);
            console.log("Contenido Entrenamientos:", entrenamientos);
            console.log("Contenido Profesores:", profesores);
            
            renderizarAdminClases(panelCentral, clases, entrenamientos, profesores);
            inicializarClases(panelCentral);

            document.getElementById('btn-add-clase').addEventListener('click', () => {
                const lista = document.getElementById('lista-crud-clases');
                const msgVacio = lista.querySelector('.msg-vacio');
                if (msgVacio) msgVacio.remove();

                const nuevaFila = `
                    <article class="tarjeta-crud-clase" data-id="nuevo">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                            <div class="texto-plan">
                                <select class="edit-clase-plan select-susc-dinamico" style="display: inline-block;">
                                    ${entrenamientos.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}
                                </select>
                            </div>
                            <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                                Profesor: 
                                <select class="edit-clase-profe select-susc-dinamico" style="display: inline-block;">
                                    ${profesores.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
                                </select>
                                &nbsp;|&nbsp;
                                Cupo Max: <span class="edit-clase-cupo" contenteditable="true" style="color: #ccc; min-width: 30px; display: inline-block; border-bottom: 1px dashed yellow;">20</span> alumnos.
                            </p>
                            <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                                Día: 
                                <select class="edit-clase-dia select-susc-dinamico" style="display: inline-block;">
                                    <option value="Lunes">Lunes</option><option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option><option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option><option value="Sábado">Sábado</option>
                                </select>
                                &nbsp;|&nbsp;
                                Hora: <span class="edit-clase-hora" contenteditable="true" style="color: white; font-weight: bold; border-bottom: 1px dashed yellow;">19:00</span> hs
                            </p>
                        </div>
                        <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            <a href="#" class="boton-enlace btn-editar-clase" style="color: green; font-family: 'gym-font'; font-size: 16px;">CONFIRMAR</a>
                            <a href="#" class="boton-enlace btn-borrar-clase" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
                        </div>
                    </article>
                `;
                lista.insertAdjacentHTML('afterbegin', nuevaFila);
            });

        } catch (err) {
            console.error("Fallo definitivo detectado en el catch del Front:", err);
            panelCentral.innerHTML = '<p style="color: red;">Error al consultar agenda relacional.</p>';
        }
    });
    //Reservas (o turnos)
if (btnReservas) {
    btnReservas.addEventListener('click', async (e) => {
        e.preventDefault();
        panelCentral.innerHTML = '<p style="color: yellow;">Consultando Postgres...</p>';
        
        try {
            const [resReservas, resUsuarios, resClases] = await Promise.all([
                fetch('http://localhost:3000/api/reservas'),
                fetch('http://localhost:3000/api/usuarios'),
                fetch('http://localhost:3000/api/clases-programadas')
            ]);

            const reservas = await resReservas.json();
            const usuarios = await resUsuarios.json();
            const clases = await resClases.json();
            
            renderizarAdminReservas(panelCentral, reservas, usuarios, clases);
            inicializarReservas(panelCentral);

            const btnAddReserva = panelCentral.querySelector('#btn-add-reserva');

            if (btnAddReserva) {
                btnAddReserva.addEventListener('click', () => {
                    const lista = document.getElementById('lista-crud-reservas');
                    const msgVacio = lista.querySelector('.msg-vacio');
                    if (msgVacio) msgVacio.remove();

                    const nuevaFila = `
                        <article class="tarjeta-crud-reserva" data-id="nuevo">
                            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 12px;">
                                <div class="texto-plan" style="display: block;">
                                    <p style="font-size: 14px; color: gray; margin-bottom: 4px; font-family: 'textos';">SELECCIONAR ALUMNO:</p>
                                    <select class="alta-reserva-user select-susc-dinamico" style="display: inline-block; font-size: 16px; width: 100%;">
                                        ${usuarios.map(u => `<option value="${u.id}">${u.correo}</option>`).join('')}
                                    </select>
                                </div>
                                
                                <div>
                                    <p style="font-size: 14px; color: gray; margin-bottom: 4px; font-family: 'textos';">SELECCIONAR CLASE DISPONIBLE (AGENDA):</p>
                                    <select class="alta-reserva-clase select-susc-dinamico" style="display: inline-block; font-size: 16px; width: 100%; max-width: 100%;">
                                        ${clases.map(c => `<option value="${c.id}">${c.entrenamiento_nombre} - ${c.dia} a las ${c.hora_inicio}hs</option>`).join('')}
                                    </select>
                                </div>

                                <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                                    Estado Inicial: <span style="color: green; font-weight: bold;">Confirmada</span>
                                </p>
                            </div>
                            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; justify-content: center;">
                                <a href="#" class="boton-enlace btn-confirmar-alta-reserva" style="color: green; font-family: 'gym-font'; font-size: 16px;">GUARDAR RESERVA</a>
                                <a href="#" class="boton-enlace btn-borrar-reserva" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">CANCELAR</a>
                            </div>
                        </article>
                    `;
                    
                    lista.insertAdjacentHTML('afterbegin', nuevaFila);

                    lista.querySelector('.btn-confirmar-alta-reserva').addEventListener('click', async (evt) => {
                        evt.preventDefault();
                        const tarjetaNueva = evt.target.closest('.tarjeta-crud-reserva');
                        
                        const paquete = {
                            idusuario: parseInt(tarjetaNueva.querySelector('.alta-reserva-user').value),
                            idclaseprogramada: parseInt(tarjetaNueva.querySelector('.alta-reserva-clase').value),
                            estado: 'confirmada'
                        };

                        try {
                            let res = await fetch('http://localhost:3000/api/reservas', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(paquete)
                            });
                            if (res.ok) {
                                document.getElementById('btn-nav-reservas').click();
                            } else {
                                const err = await res.json();
                                alert(`Error al reservar: ${err.error}`);
                            }
                        } catch (err) { alert('Error de conexión.'); }
                    });
                });
            }

        } catch (err) {
            panelCentral.innerHTML = '<p style="color: red;">Error al consultar el registro de reservas relacionales.</p>';
        }
    });
}
}
}
}
});

export function inicializarBotonesAgregar(panelCentral) {
    
    panelCentral.addEventListener('click', (evento) => {
        const botonAgregar = evento.target.closest('.btn-agregar-entidad');
        if (!botonAgregar) return;

        const contenedorLista = document.getElementById('contenedor-lista-crud');
        if (!contenedorLista) return;

        // Limpiamos el mensaje de "No hay registros" si es el primero que se agrega
        const mensajeVacio = contenedorLista.querySelector('.mensaje-vacio');
        if (mensajeVacio) mensajeVacio.remove();

        let nuevaFilaHtml = '';
        
        if (botonAgregar.id === 'btn-agregar-profe') {
            const profesorDefecto = {
                id: 'nuevo',
                nombre: 'Nuevo Profesor (Click en Editar)',
                descripcion: 'Escribe aquí la especialidad del profesor.',
                imagen: '/imagenes/cuadro-subir-imagen.png' 
            };
            nuevaFilaHtml = generarHtmlFilaProfesor(profesorDefecto);
        }

        if (botonAgregar.id === 'btn-agregar-entrenamiento') {
            const entrenamientoDefecto = {
                id: 'nuevo',
                nombre: 'Nuevo Plan de Entrenamiento',
                descripcion: 'Detalla aquí en qué consiste esta actividad del gimnasio.',
                imagen: '/imagenes/cuadro-subir-imagen.png'
            };
            nuevaFilaHtml = generarHtmlFilaEntrenamiento(entrenamientoDefecto);
        }

        if (botonAgregar.id === 'btn-agregar-inscripcion') {
            const inscripcionDefecto = {
                id: 'nuevo',
                nombre: 'Nombre',
                apellido: 'Nuevo Alumno',
                dni: 'DNI',
                telefono: 'Teléfono',
                correo: 'correo@ejemplo.com'
            };
            nuevaFilaHtml = generarHtmlFilaInscripcion(inscripcionDefecto);
        }

        contenedorLista.insertAdjacentHTML('afterbegin', nuevaFilaHtml);

        const tarjetaRecienCreada = contenedorLista.querySelector('.tarjeta-crud[data-id="nuevo"]');
        
        if (tarjetaRecienCreada) {
            const btnEditarDeLaFila = tarjetaRecienCreada.querySelector('.btn-editar');
            if (btnEditarDeLaFila) btnEditarDeLaFila.click();
        }
    });
}

