import * as api from "./apiAdmin.mjs";

export async function cargarEntrenamientos(panel) {
    try {
        const entrenamientos = await api.obtener("entrenamientos");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "ENTRENAMIENTOS";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nuevo entrenamiento";
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
        entrenamientos.forEach(entrenamiento => {
            panel.append(
                crearTarjeta(entrenamiento, panel)
            );
        });
    } catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando entrenamientos.
            </p>
        `;
    }
}

function crearTarjeta(entrenamiento, panel) {
    const card = document.createElement("article");
    card.className = "entrenamiento-contenedor";
    const imagen = document.createElement("img");
    imagen.src = entrenamiento.imagen;
    imagen.alt = entrenamiento.nombre;
    const titulo = document.createElement("h2");
    titulo.textContent = entrenamiento.nombre;
    const descripcion = document.createElement("p");
    descripcion.textContent = entrenamiento.descripcion;
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
    } = mostrarFormulario(panel, entrenamiento);
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
        `¿Eliminar "${entrenamiento.nombre}"?`
    );
    if (!confirmar)
        return;
    try{
        await api.eliminar(
            "entrenamientos",
            entrenamiento.id
        );
        await cargarEntrenamientos(panel);
    }
    catch(error){
        console.error(error);
        alert(
            "No se pudo eliminar."
        );
    }
});
    acciones.append(
        btnEditar,
        btnEliminar
    );
    card.append(
        imagen,
        titulo,
        descripcion,
        acciones
    );
    return card;
}

function mostrarFormulario(panel, entrenamiento = null) {
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
    inputNombre.placeholder = "Nombre del entrenamiento";
    inputNombre.value = entrenamiento?.nombre ?? "";

    const inputDescripcion = document.createElement("textarea");
    inputDescripcion.placeholder = "Descripción";
    inputDescripcion.rows = 5;
    inputDescripcion.value = entrenamiento?.descripcion ?? "";

    const inputImagen = document.createElement("input");
    inputImagen.type = "text";
    inputImagen.placeholder = "/imagenes/crossfit.jpg";
    inputImagen.value = entrenamiento?.imagen ?? "";

    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";

    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.textContent = entrenamiento ? "Actualizar" : "Guardar";
    btnGuardar.className = "boton-enlace";

    const btnCancelar = document.createElement("button");
    btnCancelar.type = "button";
    btnCancelar.textContent = "Cancelar";
    btnCancelar.className = "boton-enlace";
    contenedorBotones.append(
        btnGuardar,
        btnCancelar
    );
    formulario.append(
        inputNombre,
        inputDescripcion,
        inputImagen,
        contenedorBotones
    );
    formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const descripcion = inputDescripcion.value.trim();
    const imagen = inputImagen.value.trim();
    if (!nombre || !descripcion) {
        alert("Completá el nombre y la descripción.");
        return;
    }
    const datos = {
        nombre,
        descripcion,
        imagen
    };
    try {
        if (entrenamiento) {
            await api.actualizar(
                "entrenamientos",
                entrenamiento.id,
                datos
            );
        } else {
            await api.crear(
                "entrenamientos",
                datos
            );
        }
        
        formulario.remove();
        await cargarEntrenamientos(panel);
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al guardar el entrenamiento.");
    }
});
    return {
        formulario,
        inputNombre,
        inputDescripcion,
        inputImagen,
        btnCancelar
    };
}