import * as api from "./apiAdmin.mjs";

export async function cargarTestimonios(panel) {
    try {
        const testimonios = await api.obtener("testimonios");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "testimonios";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nuevo testimonio";
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
        testimonios.forEach(testimonio => {
            panel.append(
                crearTarjeta(testimonio, panel)
            );
        });
    } catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando testimonios.
            </p>
        `;
    }
}
function crearTarjeta(testimonio, panel) {
    const card = document.createElement("article");
    card.className = "testimonio-contenedor";
    const titulo =
    document.createElement("h2");
    titulo.textContent =
    testimonio.autor;
    const contenido =
    document.createElement("p");
    contenido.textContent =
    testimonio.contenido;
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
    } = mostrarFormulario(panel, testimonio);
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
        `¿Eliminar "${testimonio.nombre}"?`
    );
    if (!confirmar)
        return;
    try{
        await api.eliminar(
            "testimonios",
            testimonio.id
        );
        await cargarTestimonios(panel);
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
    titulo,
    contenido,
    acciones
);
    return card;
}
function mostrarFormulario(panel, testimonio = null) {
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
    const inputAutor = document.createElement("input");
    inputAutor.type = "text";
    inputAutor.placeholder = "Autor";
    inputAutor.value = testimonio?.autor ?? "";
    const inputContenido = document.createElement("textarea");
    inputContenido.rows = 6;
    inputContenido.placeholder = "Contenido";
    inputContenido.value =
        testimonio?.contenido ?? "";
    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";
    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.textContent = testimonio ? "Actualizar" : "Guardar";
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
        inputAutor,
        inputContenido,
        contenedorBotones
    );
    formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const autor = inputAutor.value.trim();
    const contenido = inputContenido.value.trim();
    if (!autor || !contenido) {
        alert("Completá el autor y el contenido.");
        return;
    }
    const datos = {
        autor,
        contenido
    };
    try {
        if (testimonio) {
            await api.actualizar(
                "testimonios",
                testimonio.id,
                datos
            );
        } else {
            await api.crear(
                "testimonios",
                datos
            );
        }

        formulario.remove();
        
        await cargarTestimonios(panel);
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al guardar el testimonio.");
    }
});
    return {
        formulario,
        inputAutor,
        inputContenido,
        btnCancelar
    };
}