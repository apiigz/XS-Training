import * as api from "./apiAdmin.mjs";

export async function cargarClases(panel) {
    try {
        const clases = await api.obtener("clasesprogramadas");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "CLASES PROGRAMADAS";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nueva clase";
        btnNuevo.className = "boton-enlace";
        btnNuevo.style.marginBottom = "20px";
        btnNuevo.addEventListener("click", async () => {
            const entrenamientos =
                await api.obtener("entrenamientos");
            const profesores =
                await api.obtener("profesores");
            const {
                formulario,
                btnCancelar
            } = mostrarFormulario(
                panel,
                entrenamientos,
                profesores
            );
            panel.prepend(formulario);
            btnNuevo.disabled = true;
            btnCancelar.addEventListener("click", () => {
                formulario.remove();
                btnNuevo.disabled = false;
            });
        });
        panel.append(btnNuevo);
        clases.forEach(clase => {
            panel.append(
                crearTarjeta(
                    clase,
                    panel
                )
            );
        });
    }
    catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando las clases.
            </p>
        `;
    }
}

function crearTarjeta(clase, panel) {
    const card = document.createElement("article");
    card.className = "clase-contenedor";
    // Entrenamiento
    const titulo = document.createElement("h2");
    titulo.textContent = clase.entrenamiento_nombre;
    // Profesor
    const profesor = document.createElement("p");
    profesor.innerHTML =
        `<strong>Profesor:</strong> ${clase.profesor_nombre}`;
    // Día
    const dia = document.createElement("p");
    dia.innerHTML =
        `<strong>Día:</strong> ${clase.dia}`;
    // Hora
    const hora = document.createElement("p");
    hora.innerHTML =
        `<strong>Hora:</strong> ${clase.hora_inicio}`;
    // Cupo
    const cupo = document.createElement("p");
    cupo.innerHTML =
        `<strong>Cupo máximo:</strong> ${clase.cupo}`;
    // ---------------- Acciones ----------------
    const acciones = document.createElement("div");
    acciones.style.display = "flex";
    acciones.style.justifyContent = "flex-end";
    acciones.style.gap = "10px";
    acciones.style.marginTop = "15px";
    // ---------- Editar ----------
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "boton-enlace";
    btnEditar.addEventListener("click", async () => {
        const entrenamientos =
            await api.obtener("entrenamientos");
        const profesores =
            await api.obtener("profesores");
        const {
            formulario,
            btnCancelar
        } = mostrarFormulario(
            panel,
            entrenamientos,
            profesores,
            clase
        );
        panel.prepend(formulario);
        btnCancelar.addEventListener("click", () => {
            formulario.remove();
        });
    });
    // ---------- Eliminar ----------
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "boton-enlace";
    btnEliminar.addEventListener("click", async () => {
        const confirmar = confirm(
            `¿Eliminar la clase de "${clase.entrenamiento_nombre}"?`
        );
        if (!confirmar)
            return;
        try {
            await api.eliminar(
                "clasesprogramadas",
                clase.id
            );
            alert("Clase eliminada correctamente.");
            await cargarClases(panel);
        }
        catch (error) {
            console.error(error);
            alert("No se pudo eliminar la clase.");
        }
    });
    acciones.append(
        btnEditar,
        btnEliminar
    );
    card.append(
        titulo,
        profesor,
        dia,
        hora,
        cupo,
        acciones
    );
    return card;
}

function mostrarFormulario(panel, entrenamientos, profesores, clase = null) {
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

    const selectEntrenamiento = document.createElement("select");
    entrenamientos.forEach(entrenamiento => {
        const option = document.createElement("option");
        option.value = entrenamiento.id;
        option.textContent = entrenamiento.nombre;
        if (clase && clase.identrenamiento == entrenamiento.id)
            option.selected = true;
        selectEntrenamiento.append(option);
    });
    
    const selectProfesor = document.createElement("select");
    profesores.forEach(profesor => {
        const option = document.createElement("option");
        option.value = profesor.id;
        option.textContent = profesor.nombre;
        if (clase && clase.idprofesor == profesor.id)
            option.selected = true;
        selectProfesor.append(option);
    });
    
    const inputHora = document.createElement("input");
    inputHora.type = "time";
    inputHora.value = clase?.hora_inicio ?? "";
    
    const inputCupo = document.createElement("input");
    inputCupo.type = "number";
    inputCupo.min = 1;
    inputCupo.placeholder = "Cupo máximo";
    inputCupo.value = clase?.cupo ?? "";
    
    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";
    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.className = "boton-enlace";
    btnGuardar.textContent =
        clase ? "Actualizar" : "Guardar";
    const btnCancelar = document.createElement("button");
    btnCancelar.type = "button";
    btnCancelar.className = "boton-enlace";
    btnCancelar.textContent = "Cancelar";
    contenedorBotones.append(
        btnGuardar,
        btnCancelar
    );
    formulario.append(
        selectEntrenamiento,
        selectProfesor,
        inputHora,
        inputCupo,
        contenedorBotones
    );
    
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = {
            identrenamiento:
                Number(
                    selectEntrenamiento.value
                ),
            idprofesor:
                Number(
                    selectProfesor.value
                ),
            cupo:
                Number(
                    inputCupo.value
                ),
            hora_inicio:
                inputHora.value
        };
        if (!datos.cupo || datos.cupo < 1) {
            alert("Ingrese un cupo válido.");
            return;
        }
        if (!datos.hora_inicio) {
            alert("Seleccione una hora.");
            return;
        }
        try {
            if (clase) {
                await api.actualizar(
                    "clasesprogramadas",
                    clase.id,
                    datos
                );
                alert(
                    "Clase actualizada correctamente."
                );
            }
            else {
                console.log(datos);
                await api.crear(
                    "clasesprogramadas",
                    datos
                );
                alert(
                    "Clase creada correctamente."
                );
            }
            formulario.remove();
            await cargarClases(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "Ocurrió un error al guardar la clase."
            );
        }
    });
    return {
        formulario,
        btnCancelar
    };
}