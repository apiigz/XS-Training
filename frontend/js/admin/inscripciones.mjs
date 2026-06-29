import * as api from "./apiAdmin.mjs";

export async function cargarInscripciones(panel) {
    try {
        const inscripciones = await api.obtener("inscripciones");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "INSCRIPCIONES";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nueva inscripción";
        btnNuevo.className = "boton-enlace";
        btnNuevo.style.marginBottom = "20px";
        btnNuevo.addEventListener("click", () => {
            const {
                formulario,
                btnCancelar
            } = mostrarFormulario(panel);
            panel.prepend(formulario);
            btnNuevo.disabled = true;
            btnCancelar.addEventListener("click", () => {
                formulario.remove();
                btnNuevo.disabled = false;
            });
        });
        panel.append(btnNuevo);
        inscripciones.forEach(inscripcion => {
            panel.append(
                crearTarjeta(
                    inscripcion,
                    panel
                )
            );
        });
    }
    catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando las inscripciones.
            </p>
        `;
    }
}

function crearTarjeta(inscripcion, panel) {
    const card = document.createElement("article");
    card.className = "inscripcion-contenedor";
    const nombre = document.createElement("h2");
    nombre.textContent =
        `${inscripcion.nombre} ${inscripcion.apellido}`;
    const dni = document.createElement("p");
    dni.textContent =
        `DNI: ${inscripcion.dni}`;
    const telefono = document.createElement("p");
    telefono.textContent =
        `Teléfono: ${inscripcion.numtelefono}`;
    const correo = document.createElement("p");
    correo.textContent =
        `Correo: ${inscripcion.correo}`;
    const acciones = document.createElement("div");
    acciones.style.display = "flex";
    acciones.style.justifyContent = "flex-end";
    acciones.style.gap = "10px";
    acciones.style.marginTop = "15px";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "boton-enlace";
    btnEditar.addEventListener("click", () => {
        const {
            formulario,
            btnCancelar
        } = mostrarFormulario(
            panel,
            inscripcion
        );
        panel.prepend(formulario);
        btnCancelar.addEventListener("click", () => {
            formulario.remove();
        });
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "boton-enlace";
    btnEliminar.addEventListener("click", async () => {
        const confirmar = confirm(
            `¿Eliminar la inscripción de "${inscripcion.nombre} ${inscripcion.apellido}"?`
        );
        if (!confirmar)
            return;
        try {
            await api.eliminar(
                "inscripciones",
                inscripcion.id
            );
            alert(
                "Inscripción eliminada correctamente."
            );
            await cargarInscripciones(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "No se pudo eliminar la inscripción."
            );
        }
    });
    acciones.append(
        btnEditar,
        btnEliminar
    );
    card.append(
        nombre,
        dni,
        telefono,
        correo,
        acciones
    );
    return card;
}

function mostrarFormulario(panel, inscripcion = null) {
    const formularioExistente = document.querySelector(".formulario-admin");
    if (formularioExistente) {
        formularioExistente.remove();
    }
    const formulario = document.createElement("form");
    formulario.className = "formulario-admin";
    formulario.style.display = "flex";
    formulario.style.flexDirection = "column";
    formulario.style.gap = "12px";
    formulario.style.padding = "20px";
    formulario.style.marginBottom = "25px";
    formulario.style.backgroundColor = "#111";
    formulario.style.border = "1px solid #333";
    formulario.style.borderRadius = "8px";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre";
    inputNombre.value = inscripcion?.nombre ?? "";

    const inputApellido = document.createElement("input");
    inputApellido.type = "text";
    inputApellido.placeholder = "Apellido";
    inputApellido.value = inscripcion?.apellido ?? "";

    const inputDni = document.createElement("input");
    inputDni.type = "number";
    inputDni.placeholder = "DNI";
    inputDni.value = inscripcion?.dni ?? "";

    const inputTelefono = document.createElement("input");
    inputTelefono.type = "text";
    inputTelefono.placeholder = "Teléfono";
    inputTelefono.value = inscripcion?.numtelefono ?? "";

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.placeholder = "Correo";
    inputCorreo.value = inscripcion?.correo ?? "";

    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";
    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.className = "boton-enlace";
    btnGuardar.textContent =
        inscripcion ? "Actualizar" : "Guardar";
    const btnCancelar = document.createElement("button");
    btnCancelar.type = "button";
    btnCancelar.className = "boton-enlace";
    btnCancelar.textContent = "Cancelar";
    contenedorBotones.append(
        btnGuardar,
        btnCancelar
    );
    formulario.append(
        inputNombre,
        inputApellido,
        inputDni,
        inputTelefono,
        inputCorreo,
        contenedorBotones
    );
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = {
            nombre:
                inputNombre.value.trim(),
            apellido:
                inputApellido.value.trim(),
            dni:
                inputDni.value.trim(),
            numtelefono:
                inputTelefono.value.trim(),
            correo:
                inputCorreo.value.trim()
        };
        if (
            !datos.nombre ||
            !datos.apellido ||
            !datos.dni ||
            !datos.numtelefono ||
            !datos.correo
        ) {
            alert(
                "Todos los campos son obligatorios."
            );
            return;
        }
        try {
            if (inscripcion) {
                await api.actualizar(
                    "inscripciones",
                    inscripcion.id,
                    datos
                );
                alert(
                    "Inscripción actualizada correctamente."
                );
            }
            else {
                await api.crear(
                    "inscripciones",
                    datos
                );
                alert(
                    "Inscripción creada correctamente."
                );
            }
            formulario.remove();
            await cargarInscripciones(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "Ocurrió un error al guardar la inscripción."
            );
        }
    });
    return {
        formulario,
        btnCancelar
    };
}