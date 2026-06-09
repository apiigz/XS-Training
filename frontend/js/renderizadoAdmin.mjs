//Los entrenamientoooss

export function renderizarAdminEntrenamientos(contenedor, listaEntrenamientos) {
    const filas = listaEntrenamientos.map(plan => `
        <article class="tarjeta-crud-entrenamiento" data-id="${plan.id || 'nuevo'}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                <div class="texto-plan" style="display: block;">
                    <h1 class="edit-entrenamiento-nombre" contenteditable="false" style="font-size: 24px; margin: 0; color: yellow;">${plan.nombre}</h1>
                    <p class="edit-entrenamiento-descripcion" contenteditable="false" style="font-size: 16px; color: #ccc; margin-top: 5px; line-height: 1.4;">${plan.descripcion}</p>
                </div>
                <div style="max-width: 350px;">
                    <img src="${plan.imagen}" class="img-entrenamiento-editable" alt="Imagen entrenamiento" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #333; transition: opacity 0.3s ease;">
                    <input type="file" class="input-archivo-entrenamiento" accept=".webp, .png, .jpg, .jpeg" style="display: none;">
                </div>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-entrenamiento" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-entrenamiento" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>GESTIÓN DE ENTRENAMIENTOS</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-entrenamiento">AGREGAR ENTRENAMIENTO</button>
        </div>
        <div class="planes" id="lista-crud-entrenamientos">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay entrenamientos registrados.</p>'}
        </div>
    `;
}

export function inicializarEntrenamientos(contenedorPadre) {
    // Manejo de clicks internos (Editar, Confirmar, Borrar, Imagen)
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-entrenamiento');
        const btnBorrar = e.target.closest('.btn-borrar-entrenamiento');
        const imgCliqueada = e.target.closest('.img-entrenamiento-editable');
        const tarjeta = e.target.closest('.tarjeta-crud-entrenamiento');
        if (!tarjeta) return;

        const nombre = tarjeta.querySelector('.edit-entrenamiento-nombre');
        const descripcion = tarjeta.querySelector('.edit-entrenamiento-descripcion');
        const imagen = tarjeta.querySelector('.img-entrenamiento-editable');
        const inputArchivo = tarjeta.querySelector('.input-archivo-entrenamiento');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = nombre.getAttribute('contenteditable') === 'true';

            if (!modoEdicion) {
                nombre.setAttribute('contenteditable', 'true');
                descripcion.setAttribute('contenteditable', 'true');
                nombre.style.borderBottom = descripcion.style.borderBottom = '1px dashed yellow';
                nombre.focus();
                if (imagen) { imagen.style.opacity = '0.4'; imagen.style.cursor = 'pointer'; }
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const paquete = {
                    nombre: nombre.innerText.trim(),
                    descripcion: descripcion.innerText.trim(),
                    imagen: imagen ? imagen.src.replace(window.location.origin, '') : '/imagenes/cuadro-subir-imagen.png'
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/entrenamientos' : `http://localhost:3000/api/entrenamientos/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    nombre.setAttribute('contenteditable', 'false');
                    descripcion.setAttribute('contenteditable', 'false');
                    nombre.style.borderBottom = descripcion.style.borderBottom = 'none';
                    if (imagen) { imagen.style.opacity = '1'; imagen.style.cursor = 'default'; }
                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (imgCliqueada && nombre.getAttribute('contenteditable') === 'true' && inputArchivo) {
            inputArchivo.click();
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar entrenamiento?')) {
                let res = await fetch(`http://localhost:3000/api/entrenamientos/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });

    // Manejo del cambio de imagen
    contenedorPadre.addEventListener('change', (e) => {
        const input = e.target.closest('.input-archivo-entrenamiento');
        if (!input || !input.files[0]) return;
        const tarjeta = e.target.closest('.tarjeta-crud-entrenamiento');
        const img = tarjeta.querySelector('.img-entrenamiento-editable');
        const lector = new FileReader();
        lector.onload = (evt) => { if (img) img.src = evt.target.result; };
        lector.readAsDataURL(input.files[0]);
    });
}


//Los profess

export function renderizarAdminProfesores(contenedor, listaProfesores) {
    const filas = listaProfesores.map(profe => `
        <article class="tarjeta-crud-profesor" data-id="${profe.id || 'nuevo'}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                <div class="texto-plan" style="display: block;">
                    <h1 class="edit-profe-nombre" contenteditable="false" style="font-size: 24px; margin: 0; color: yellow;">${profe.nombre}</h1>
                    <p class="edit-profe-descripcion" contenteditable="false" style="font-size: 16px; color: #ccc; margin-top: 5px; line-height: 1.4;">${profe.descripcion}</p>
                </div>
                <div style="max-width: 350px;">
                    <img src="${profe.imagen}" class="img-profe-editable" alt="Imagen profesor" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #333; transition: opacity 0.3s ease;">
                    <input type="file" class="input-archivo-profesor" accept=".webp, .png, .jpg, .jpeg" style="display: none;">
                </div>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-profesor" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-profesor" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>EQUIPO DE PROFESORES</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-profesor">AGREGAR PROFESOR</button>
        </div>
        <div class="planes" id="lista-crud-profesores">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay profesores registrados.</p>'}
        </div>
    `;
}

export function inicializarProfesores(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-profesor');
        const btnBorrar = e.target.closest('.btn-borrar-profesor');
        const imgCliqueada = e.target.closest('.img-profe-editable');
        const tarjeta = e.target.closest('.tarjeta-crud-profesor');
        if (!tarjeta) return;

        const nombre = tarjeta.querySelector('.edit-profe-nombre');
        const descripcion = tarjeta.querySelector('.edit-profe-descripcion');
        const imagen = tarjeta.querySelector('.img-profe-editable');
        const inputArchivo = tarjeta.querySelector('.input-archivo-profesor');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = nombre.getAttribute('contenteditable') === 'true';

            if (!modoEdicion) {
                nombre.setAttribute('contenteditable', 'true');
                descripcion.setAttribute('contenteditable', 'true');
                nombre.style.borderBottom = descripcion.style.borderBottom = '1px dashed yellow';
                nombre.focus();
                if (imagen) { imagen.style.opacity = '0.4'; imagen.style.cursor = 'pointer'; }
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const paquete = {
                    nombre: nombre.innerText.trim(),
                    descripcion: descripcion.innerText.trim(),
                    imagen: imagen ? imagen.src.replace(window.location.origin, '') : '/imagenes/cuadro-subir-imagen.png'
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/profesores' : `http://localhost:3000/api/profesores/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    nombre.setAttribute('contenteditable', 'false');
                    descripcion.setAttribute('contenteditable', 'false');
                    nombre.style.borderBottom = descripcion.style.borderBottom = 'none';
                    if (imagen) { imagen.style.opacity = '1'; imagen.style.cursor = 'default'; }
                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (imgCliqueada && nombre.getAttribute('contenteditable') === 'true' && inputArchivo) {
            inputArchivo.click();
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar profesor?')) {
                let res = await fetch(`http://localhost:3000/api/profesores/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });

    contenedorPadre.addEventListener('change', (e) => {
        const input = e.target.closest('.input-archivo-profesor');
        if (!input || !input.files[0]) return;
        const tarjeta = e.target.closest('.tarjeta-crud-profesor');
        const img = tarjeta.querySelector('.img-profe-editable');
        const lector = new FileReader();
        lector.onload = (evt) => { if (img) img.src = evt.target.result; };
        lector.readAsDataURL(input.files[0]);
    });
}

//Las inscripciones

export function renderizarAdminInscripciones(contenedor, listaInscripciones) {
    const filas = listaInscripciones.map(ins => `
        <article class="tarjeta-crud-inscripcion" data-id="${ins.id || 'nuevo'}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                <div class="texto-plan" style="display: flex; gap: 5px; justify-content: flex-start; align-items: center;">
                    <span class="edit-ins-apellido" contenteditable="false" style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">${ins.apellido || 'Apellido'}</span>
                    <span style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">,</span>
                    <span class="edit-ins-nombre" contenteditable="false" style="font-size: 24px; color: yellow; font-family: 'titulos'; font-weight: bold;">${ins.nombre || 'Nombre'}</span>
                </div>
                <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                    DNI: <span class="edit-ins-dni" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">${ins.dni || 'DNI'}</span> &nbsp;|&nbsp; 
                    Tel: <span class="edit-ins-tel" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">${ins.telefono || 'Teléfono'}</span> &nbsp;|&nbsp; 
                    Correo: <span class="edit-ins-correo" contenteditable="false" style="color: #ccc; min-width: 50px; display: inline-block;">${ins.correo || 'ejemplo@gym.com'}</span>
                </p>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-inscripcion" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-inscripcion" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>SOLICITUDES DE INSCRIPCIÓN</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-inscripcion">AGREGAR INSCRIPCIÓN</button>
        </div>
        <div class="planes" id="lista-crud-inscripciones">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay inscripciones registradas.</p>'}
        </div>
    `;
}

export function inicializarInscripciones(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-inscripcion');
        const btnBorrar = e.target.closest('.btn-borrar-inscripcion');
        const tarjeta = e.target.closest('.tarjeta-crud-inscripcion');
        if (!tarjeta) return;

        const nombre = tarjeta.querySelector('.edit-ins-nombre');
        const apellido = tarjeta.querySelector('.edit-ins-apellido');
        const dni = tarjeta.querySelector('.edit-ins-dni');
        const tel = tarjeta.querySelector('.edit-ins-tel');
        const correo = tarjeta.querySelector('.edit-ins-correo');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = nombre.getAttribute('contenteditable') === 'true';

            if (!modoEdicion) {
                const campos = [nombre, apellido, dni, tel, correo];
                campos.forEach(c => {
                    c.setAttribute('contenteditable', 'true');
                    c.style.borderBottom = '1px dashed yellow';
                });
                apellido.focus();
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const paquete = {
                    nombre: nombre.innerText.trim(),
                    apellido: apellido.innerText.trim(),
                    dni: dni.innerText.trim(),
                    telefono: tel.innerText.trim(),
                    correo: correo.innerText.trim()
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/inscripciones' : `http://localhost:3000/api/inscripciones/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    console.log(res);
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    const campos = [nombre, apellido, dni, tel, correo];
                    campos.forEach(c => {
                        c.setAttribute('contenteditable', 'false');
                        c.style.borderBottom = 'none';
                    });
                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar inscripción?')) {
                let res = await fetch(`http://localhost:3000/api/inscripciones/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });
}

//Testimonios

export function renderizarAdminTestimonios(contenedor, listaTestimonios) {
    const filas = listaTestimonios.map(test => `
        <article class="tarjeta-crud-testimonio" data-id="${test.id || 'nuevo'}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                <div class="texto-plan">
                    <h1 class="edit-test-autor" contenteditable="false" style="font-size: 24px; color: yellow; margin: 0;">${test.autor || 'Nombre del Alumno'}</h1>
                    <p class="edit-test-contenido" contenteditable="false" style="font-size: 16px; color: white; margin-top: 5px; font-family: 'textos'; line-height: 1.4;">
                        "${test.contenido || 'Escribe aquí la opinión del cliente...'}"
                    </p>
                </div>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-testimonio" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-testimonio" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>GESTIÓN DE TESTIMONIOS</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-testimonio">AGREGAR OPINIÓN</button>
        </div>
        <div class="planes" id="lista-crud-testimonios">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay testimonios cargados.</p>'}
        </div>
    `;
}

export function inicializarTestimonios(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-testimonio');
        const btnBorrar = e.target.closest('.btn-borrar-testimonio');
        const tarjeta = e.target.closest('.tarjeta-crud-testimonio');
        if (!tarjeta) return;

        const autor = tarjeta.querySelector('.edit-test-autor');
        const contenido = tarjeta.querySelector('.edit-test-contenido');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = autor.getAttribute('contenteditable') === 'true';

            if (!modoEdicion) {
                autor.setAttribute('contenteditable', 'true');
                contenido.setAttribute('contenteditable', 'true');
                autor.style.borderBottom = contenido.style.borderBottom = '1px dashed yellow';
                contenido.focus();
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const contenidoLimpio = contenido.innerText.trim().replace(/^"|"$/g, '');

                const paquete = {
                    autor: autor.innerText.trim(),
                    contenido: contenidoLimpio
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/testimonios' : `http://localhost:3000/api/testimonios/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    autor.setAttribute('contenteditable', 'false');
                    contenido.setAttribute('contenteditable', 'false');
                    autor.style.borderBottom = contenido.style.borderBottom = 'none';
                    
                    contenido.innerText = `"${paquete.contenido}"`;

                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar este testimonio?')) {
                let res = await fetch(`http://localhost:3000/api/testimonios/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });
}

//Suscripciones

let usuariosCache = [];
let entrenamientosCache = [];
const estadosPosibles = ['pago', 'vencido', 'pendiente']; //Es el enum de la bd suscripciones, la que borramos de 

export function renderizarAdminSuscripciones(contenedor, listaSuscripciones, usuarios, entrenamientos) {
    usuariosCache = usuarios;
    entrenamientosCache = entrenamientos;

    const filas = listaSuscripciones.map(susc => {
        const fPago = susc.fechapago ? susc.fechapago.split('T')[0] : '';
        const fVenc = susc.fechavencimiento ? susc.fechavencimiento.split('T')[0] : '';

        return `
        <article class="tarjeta-crud-suscripcion" data-id="${susc.id}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                <div class="texto-plan">
                    <h1 class="vista-lectura-susc" style="font-size: 24px; color: yellow; margin: 0;">
                        ${susc.usuario_email || 'Usuario ID: ' + susc.idusuario}
                    </h1>
                    <select class="edit-susc-usuario select-susc-dinamico" style="display: none; font-size: 18px; font-family: 'textos'; background: #3e3e3e; color: white; border: 1px solid #555; padding: 5px;">
                        ${usuariosCache.map(u => `<option value="${u.id}" ${u.id === susc.idusuario ? 'selected' : ''}>${u.correo}</option>`).join('')}
                    </select>
                </div>
                
                <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                    Plan: 
                    <span class="txt-susc-plan">${susc.entrenamiento_nombre || 'Ninguno'}</span>
                    <select class="edit-susc-plan select-susc-dinamico" style="display: none; background: #3e3e3e; color: white; border: 1px solid #555;">
                        ${entrenamientosCache.map(e => `<option value="${e.id}" ${e.id === susc.identrenamiento ? 'selected' : ''}>${e.nombre}</option>`).join('')}
                    </select>
                    &nbsp;|&nbsp;

                    Monto: $<span class="edit-susc-monto" contenteditable="false" style="color: #ccc; min-width: 40px; display: inline-block;">${susc.monto || 0}</span>
                    &nbsp;|&nbsp;

                    Estado: 
                    <span class="txt-susc-estado" style="color: yellow;">${susc.estado || 'Activo'}</span>
                    <select class="edit-susc-estado select-susc-dinamico" style="display: none; background: #3e3e3e; color: white; border: 1px solid #555;">
                        ${estadosPosibles.map(est => `<option value="${est}" ${est === susc.estado ? 'selected' : ''}>${est}</option>`).join('')}
                    </select>
                </p>

                <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                    Pago: <input type="date" class="edit-susc-fpago" value="${fPago}" disabled style="background: transparent; color: #ccc; border: none;"> | 
                    Vence: <input type="date" class="edit-susc-fvenc" value="${fVenc}" disabled style="background: transparent; color: #ccc; border: none;">
                </p>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-suscripcion" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-suscripcion" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
        `;
    }).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>GESTIÓN DE SUSCRIPCIONES</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-suscripcion">NUEVA SUSCRIPCIÓN</button>
        </div>
        <div class="planes" id="lista-crud-suscripciones">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay suscripciones registradas.</p>'}
        </div>
    `;
}

export function inicializarSuscripciones(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-suscripcion');
        const btnBorrar = e.target.closest('.btn-borrar-suscripcion');
        const tarjeta = e.target.closest('.tarjeta-crud-suscripcion');
        if (!tarjeta) return;

        const vistaLecturaUsuario = tarjeta.querySelector('.vista-lectura-susc');
        const selectUsuario = tarjeta.querySelector('.edit-susc-usuario');
        const txtPlan = tarjeta.querySelector('.txt-susc-plan');
        const selectPlan = tarjeta.querySelector('.edit-susc-plan');
        const txtEstado = tarjeta.querySelector('.txt-susc-estado');
        const selectEstado = tarjeta.querySelector('.edit-susc-estado');
        
        const monto = tarjeta.querySelector('.edit-susc-monto');
        const inputFPago = tarjeta.querySelector('.edit-susc-fpago');
        const inputFVenc = tarjeta.querySelector('.edit-susc-fvenc');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = selectPlan.style.display === 'inline-block';

            if (!modoEdicion) {
                if(vistaLecturaUsuario) vistaLecturaUsuario.style.display = 'none';
                selectUsuario.style.display = 'inline-block';
                
                txtPlan.style.display = 'none';
                selectPlan.style.display = 'inline-block';
                
                txtEstado.style.display = 'none';
                selectEstado.style.display = 'inline-block';

                monto.setAttribute('contenteditable', 'true');
                monto.style.borderBottom = '1px dashed yellow';
                
                inputFPago.removeAttribute('disabled');
                inputFVenc.removeAttribute('disabled');
                inputFPago.style.borderBottom = inputFVenc.style.borderBottom = '1px dashed yellow';

                monto.focus();
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const paquete = {
                    idusuario: parseInt(selectUsuario.value),
                    identrenamiento: parseInt(selectPlan.value),
                    monto: parseFloat(monto.innerText.trim()) || 0,
                    estado: selectEstado.value,
                    fechapago: inputFPago.value || null,
                    fechavencimiento: inputFVenc.value || null
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/suscripciones' : `http://localhost:3000/api/suscripciones/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    if(vistaLecturaUsuario) {
                        vistaLecturaUsuario.innerText = selectUsuario.options[selectUsuario.selectedIndex].text;
                        vistaLecturaUsuario.style.display = 'block';
                    }
                    selectUsuario.style.display = 'none';

                    txtPlan.innerText = selectPlan.options[selectPlan.selectedIndex].text;
                    txtPlan.style.display = 'inline';
                    selectPlan.style.display = 'none';

                    txtEstado.innerText = selectEstado.value;
                    txtEstado.style.display = 'inline';
                    selectEstado.style.display = 'none';

                    monto.setAttribute('contenteditable', 'false');
                    monto.style.borderBottom = 'none';
                    
                    inputFPago.setAttribute('disabled', 'true');
                    inputFVenc.setAttribute('disabled', 'true');
                    inputFPago.style.borderBottom = inputFVenc.style.borderBottom = 'none';

                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar suscripción definitivamente?')) {
                let res = await fetch(`http://localhost:3000/api/suscripciones/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });
}


//Clases programadas

let profesoresCache = []; 

export function renderizarAdminClases(contenedor, listaClases, entrenamientos, profesores) {
    entrenamientosCache = entrenamientos; 
    profesoresCache = profesores;

    const filas = listaClases.map(clase => `
        <article class="tarjeta-crud-clase" data-id="${clase.id}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                <div class="texto-plan" style="display: flex; gap: 5px; justify-content: flex-start; align-items: center;">
                    <h1 class="vista-lectura-clase-plan" style="font-size: 24px; color: yellow; margin: 0;">
                        ${clase.entrenamiento_nombre || 'Actividad ID: ' + clase.identrenamiento}
                    </h1>
                    <select class="edit-clase-plan select-susc-dinamico" style="display: none; font-size: 18px; font-family: 'textos'; background: #3e3e3e; color: white; border: 1px solid #555; padding: 5px;">
                        ${entrenamientosCache.map(e => `<option value="${e.id}" ${e.id === clase.identrenamiento ? 'selected' : ''}>${e.nombre}</option>`).join('')}
                    </select>
                </div>
                
                <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                    Profesor: 
                    <span class="txt-clase-profe">${clase.profesor_nombre || 'Profesor ID: ' + clase.idprofesor}</span>
                    <select class="edit-clase-profe select-susc-dinamico" style="display: none; background: #3e3e3e; color: white; border: 1px solid #555;">
                        ${profesoresCache.map(p => `<option value="${p.id}" ${p.id === clase.idprofesor ? 'selected' : ''}>${p.nombre}</option>`).join('')}
                    </select>
                    &nbsp;|&nbsp;

                    Cupo Max: 
                    <span class="edit-clase-cupo" contenteditable="false" style="color: #ccc; min-width: 30px; display: inline-block;">${clase.cupo || 0}</span> alumnos.
                </p>

                <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                    Día: 
                    <span class="txt-clase-dia" style="color: yellow;">${clase.dia || 'Lunes'}</span>
                    <select class="edit-clase-dia select-susc-dinamico" style="display: none; background: #3e3e3e; color: white; border: 1px solid #555;">
                        <option value="Lunes" ${clase.dia === 'Lunes' ? 'selected' : ''}>Lunes</option>
                        <option value="Martes" ${clase.dia === 'Martes' ? 'selected' : ''}>Martes</option>
                        <option value="Miércoles" ${clase.dia === 'Miércoles' ? 'selected' : ''}>Miércoles</option>
                        <option value="Jueves" ${clase.dia === 'Jueves' ? 'selected' : ''}>Jueves</option>
                        <option value="Viernes" ${clase.dia === 'Viernes' ? 'selected' : ''}>Viernes</option>
                        <option value="Sábado" ${clase.dia === 'Sábado' ? 'selected' : ''}>Sábado</option>
                    </select>
                    &nbsp;|&nbsp;
                    Hora: <span class="edit-clase-hora" contenteditable="false" style="color: white; font-weight: bold;">${clase.hora_inicio || '00:00'}</span> hs
                </p>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-clase" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR</a>
                <a href="#" class="boton-enlace btn-borrar-clase" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>CRONOGRAMA DE CLASES</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-clase">PROGRAMAR CLASE</button>
        </div>
        <div class="planes" id="lista-crud-clases">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay clases asignadas en el cronograma.</p>'}
        </div>
    `;
}

export function inicializarClases(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-clase');
        const btnBorrar = e.target.closest('.btn-borrar-clase');
        const tarjeta = e.target.closest('.tarjeta-crud-clase');
        if (!tarjeta) return;

        const txtPlan = tarjeta.querySelector('.vista-lectura-clase-plan');
        const selectPlan = tarjeta.querySelector('.edit-clase-plan');
        const txtProfe = tarjeta.querySelector('.txt-clase-profe');
        const selectProfe = tarjeta.querySelector('.edit-clase-profe');
        const txtDia = tarjeta.querySelector('.txt-clase-dia');
        const selectDia = tarjeta.querySelector('.edit-clase-dia');
        
        const cupo = tarjeta.querySelector('.edit-clase-cupo');
        const hora = tarjeta.querySelector('.edit-clase-hora');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = selectPlan.style.display === 'inline-block';

            if (!modoEdicion) {
                txtPlan.style.display = 'none'; selectPlan.style.display = 'inline-block';
                txtProfe.style.display = 'none'; selectProfe.style.display = 'inline-block';
                txtDia.style.display = 'none'; selectDia.style.display = 'inline-block';

                cupo.setAttribute('contenteditable', 'true');
                hora.setAttribute('contenteditable', 'true');
                cupo.style.borderBottom = hora.style.borderBottom = '1px dashed yellow';

                cupo.focus();
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const id = tarjeta.dataset.id;
                const paquete = {
                    identrenamiento: parseInt(selectPlan.value),
                    idprofesor: parseInt(selectProfe.value),
                    cupo: parseInt(cupo.innerText.trim()) || 0,
                    dia: selectDia.value,
                    hora_inicio: hora.innerText.trim()
                };

                try {
                    let res = await fetch(id === 'nuevo' ? 'http://localhost:3000/api/clases' : `http://localhost:3000/api/clases/${id}`, {
                        method: id === 'nuevo' ? 'POST' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    const datos = await res.json();
                    if (!res.ok) return alert(`Error: ${datos.error}`);

                    if (id === 'nuevo') tarjeta.dataset.id = datos.id;

                    txtPlan.innerText = selectPlan.options[selectPlan.selectedIndex].text;
                    txtPlan.style.display = 'block'; selectPlan.style.display = 'none';

                    txtProfe.innerText = selectProfe.options[selectProfe.selectedIndex].text;
                    txtProfe.style.display = 'inline'; selectProfe.style.display = 'none';

                    txtDia.innerText = selectDia.value;
                    txtDia.style.display = 'inline'; selectDia.style.display = 'none';

                    cupo.setAttribute('contenteditable', 'false');
                    hora.setAttribute('contenteditable', 'false');
                    cupo.style.borderBottom = hora.style.borderBottom = 'none';

                    btnEditar.innerText = 'EDITAR';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (btnBorrar) {
            e.preventDefault();
            const id = tarjeta.dataset.id;
            if (id === 'nuevo') return tarjeta.remove();
            if (confirm('¿Eliminar esta clase del cronograma?')) {
                let res = await fetch(`http://localhost:3000/api/clases/${id}`, { method: 'DELETE' });
                if (res.ok) tarjeta.remove();
            }
        }
    });
}

let clasesCache = []; 
const estadosReserva = ['confirmada', 'no confirmada', 'asistió', 'ausente', 'cancelada']; 

export function renderizarAdminReservas(contenedor, listaReservas, usuarios, clases) {
    usuariosCache = usuarios;
    clasesCache = clases;

    const filas = listaReservas.map(res => `
        <article class="tarjeta-crud-reserva" data-id="${res.id}">
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px;">
                <div class="texto-plan">
                    <h1 style="font-size: 24px; color: yellow; margin: 0;">${res.usuario_email}</h1>
                </div>
                
                <p style="font-size: 16px; color: white; font-family: 'textos'; margin: 0; line-height: 1.6;">
                    Turno: <span style="color: #fff; font-weight: bold;">${res.entrenamiento_nombre}</span> 
                    (${res.clase_fecha_corta} - ${res.clase_dia} a las ${res.clase_hora} hs)
                </p>

                <p style="font-size: 14px; color: #aaa; font-family: 'textos'; margin: 0;">
                    Asistencia: 
                    <span class="txt-reserva-estado" style="color: yellow; font-weight: bold;">${res.estado}</span>
                    
                    <select class="edit-reserva-estado select-susc-dinamico" style="display: none; background: #3e3e3e; color: white; border: 1px solid #555; text-transform: ;">
                        ${estadosReserva.map(est => `<option value="${est}" ${est === res.estado ? 'selected' : ''}>${est}</option>`).join('')}
                    </select>
                </p>
            </div>
            <div class="acciones-crud" style="flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                <a href="#" class="boton-enlace btn-editar-reserva" style="color: yellow; font-family: 'gym-font'; font-size: 16px;">EDITAR ESTADO</a>
                <a href="#" class="boton-enlace btn-borrar-reserva" style="color: #ff4d4d; font-family: 'gym-font'; font-size: 16px;">ELIMINAR</a>
            </div>
        </article>
    `).join('');

    contenedor.innerHTML = `
        <div class="texto-plan">
            <h1>RESERVAS DE TURNOS</h1>
            <button type="button" class="btn-agregar-entidad" id="btn-add-reserva">AGREGAR RESERVA MANUAL</button>
        </div>
        <div class="planes" id="lista-crud-reservas">
            ${filas.length > 0 ? filas : '<p class="msg-vacio">No hay reservas agendadas.</p>'}
        </div>
    `;
}

export function inicializarReservas(contenedorPadre) {
    contenedorPadre.addEventListener('click', async (e) => {
        const btnEditar = e.target.closest('.btn-editar-reserva');
        const btnBorrar = e.target.closest('.btn-borrar-reserva');
        const tarjeta = e.target.closest('.tarjeta-crud-reserva');
        if (!tarjeta) return;

        const id = tarjeta.dataset.id;
        if (id === 'nuevo' && !btnBorrar) return; 

        const txtEstado = tarjeta.querySelector('.txt-reserva-estado');
        const selectEstado = tarjeta.querySelector('.edit-reserva-estado');

        if (btnEditar) {
            e.preventDefault();
            const modoEdicion = selectEstado.style.display === 'inline-block';

            if (!modoEdicion) {
                txtEstado.style.display = 'none'; 
                selectEstado.style.display = 'inline-block';
                selectEstado.focus();
                btnEditar.innerText = 'CONFIRMAR';
                btnEditar.style.color = '#5cb85c';
            } else {
                const paquete = { estado: selectEstado.value };

                try {
                    console.log("capturado:", id)
                    console.log("capturado:", paquete)
                    let res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paquete)
                    });
                    
                    if (!res.ok) {
                        const err = await res.json();
                        return alert(`Error: ${err.error}`);
                    }

                    txtEstado.innerText = selectEstado.value;
                    txtEstado.style.display = 'inline'; 
                    selectEstado.style.display = 'none';

                    btnEditar.innerText = 'EDITAR ESTADO';
                    btnEditar.style.color = 'yellow';
                } catch (err) { alert('Error de conexión.'); }
            }
        }

        if (btnBorrar) {
            e.preventDefault();
            if (id === 'nuevo') return tarjeta.remove();
            
            if (confirm('¿Dar de baja esta reserva de turno?')) {
                try {
                    let res = await fetch(`http://localhost:3000/api/reservas/${id}`, { 
                        method: 'DELETE' 
                    });
                    
                    if (res.ok) {
                        tarjeta.remove();
                    } else {
                        const err = await res.json();
                        alert(`Error al eliminar: ${err.error}`);
                    }
                } catch (err) { alert('Error de conexión.'); }
            }
        }
    });
}