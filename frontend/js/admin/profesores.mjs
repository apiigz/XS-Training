import * as api from "./apiAdmin.mjs";
export async function cargarProfesores(panel) {
    try {
        const profesores = await api.obtener("profesores");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "profesores";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nuevo profesor";
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
        profesores.forEach(profesor => {
            panel.append(
                crearTarjeta(profesor, panel)
            );
        });
    } catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando profesores.
            </p>
        `;
    }
}
function crearTarjeta(profesor, panel) {
    const card = document.createElement("article");
    card.className = "profesor-contenedor";
    const imagen = document.createElement("img");
    imagen.src = profesor.imagen;
    imagen.alt = profesor.nombre;
    const titulo = document.createElement("h2");
    titulo.textContent = profesor.nombre;
    const descripcion = document.createElement("p");
    descripcion.textContent = profesor.descripcion;
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
    } = mostrarFormulario(panel, profesor);
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
        `¿Eliminar "${profesor.nombre}"?`
    );
    if (!confirmar)
        return;
    try{
        await api.eliminar(
            "profesores",
            profesor.id
        );
        await cargarProfesores(panel);
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
function mostrarFormulario(panel, profesor = null) {
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
    inputNombre.placeholder = "Nombre del profesor";
    inputNombre.value = profesor?.nombre ?? "";
    const inputDescripcion = document.createElement("textarea");
    inputDescripcion.placeholder = "Descripción";
    inputDescripcion.rows = 5;
    inputDescripcion.value = profesor?.descripcion ?? "";
    const inputImagen = document.createElement("input");
    inputImagen.type = "text";
    inputImagen.placeholder = "/imagenes/crossfit.jpg";
    inputImagen.value = profesor?.imagen ?? "";
    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";
    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.textContent = profesor ? "Actualizar" : "Guardar";
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
        if (profesor) {
            await api.actualizar(
                "profesores",
                profesor.id,
                datos
            );
        } else {
            await api.crear(
                "profesores",
                datos
            );
        }

        formulario.remove();
        
        await cargarProfesores(panel);
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al guardar el profesor.");
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