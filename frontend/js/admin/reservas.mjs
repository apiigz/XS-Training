import * as api from "./apiAdmin.mjs";

export async function cargarReservas(panel) {
    try {
        const reservas = await api.obtener("reservas");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "RESERVAS";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nueva reserva";
        btnNuevo.className = "boton-enlace";
        btnNuevo.style.marginBottom = "20px";
        btnNuevo.addEventListener("click", async () => {
            const usuarios =
                await api.obtener("usuarios");
            const clases =
                await api.obtener("clasesprogramadas");
            const {
                formulario,
                btnCancelar
            } = mostrarFormulario(
                panel,
                usuarios,
                clases
            );
            panel.prepend(formulario);
            btnNuevo.disabled = true;
            btnCancelar.addEventListener("click", () => {
                formulario.remove();
                btnNuevo.disabled = false;
            });
        });
        panel.append(btnNuevo);
        reservas.forEach(reserva => {
            panel.append(
                crearTarjeta(
                    reserva,
                    panel
                )
            );
        });
    }
    catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando las reservas.
            </p>
        `;
    }
}
function crearTarjeta(reserva, panel) {
    const card = document.createElement("article");
    card.className = "reserva-contenedor";
    const usuario = document.createElement("h2");
    usuario.textContent = reserva.usuario_email;
    const entrenamiento = document.createElement("p");
    entrenamiento.textContent =
        `Entrenamiento: ${reserva.entrenamiento_nombre}`;
    const clase = document.createElement("p");
    clase.textContent =
        `Clase: ${reserva.clase_dia} ${reserva.clase_hora}`;
    const estado = document.createElement("p");
    estado.textContent =
        `Estado: ${reserva.estado}`;
    const acciones = document.createElement("div");
    acciones.style.display = "flex";
    acciones.style.justifyContent = "flex-end";
    acciones.style.gap = "10px";
    acciones.style.marginTop = "15px";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "boton-enlace";
    btnEditar.addEventListener("click", async () => {
        const usuarios =
            await api.obtener("usuarios");
        const clases =
            await api.obtener("clasesprogramadas");
        const {
            formulario,
            btnCancelar
        } = mostrarFormulario(
            panel,
            usuarios,
            clases,
            reserva
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
            `¿Eliminar la reserva de "${reserva.usuario_email}"?`
        );
        if (!confirmar)
            return;
        try {
            await api.eliminar(
                "reservas",
                reserva.id
            );
            alert(
                "Reserva eliminada correctamente."
            );
            await cargarReservas(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "No se pudo eliminar la reserva."
            );
        }
    });
    acciones.append(
        btnEditar,
        btnEliminar
    );
    card.append(
        usuario,
        entrenamiento,
        clase,
        estado,
        acciones
    );
    return card;
}
function mostrarFormulario(panel, usuarios, clases, reserva = null) {
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
    
    const selectUsuario = document.createElement("select");
    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.correo;
        if (reserva && reserva.idusuario == usuario.id)
            option.selected = true;
        selectUsuario.append(option);
    });
    
    const selectClase = document.createElement("select");
    clases.forEach(clase => {
        const option = document.createElement("option");
        option.value = clase.id;
        option.textContent =
            `${clase.entrenamiento_nombre} - ${clase.dia} ${clase.hora_inicio}`;
        if (reserva && reserva.idclaseprogramada == clase.id)
            option.selected = true;
        selectClase.append(option);
    });
    
    const selectEstado = document.createElement("select");
    const estados = [
        "confirmada",
        "no confirmada",
        "asistió",
        "ausente",
        "cancelada"
    ];
    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado;
        option.textContent = estado;
        if (reserva && reserva.estado === estado)
            option.selected = true;
        selectEstado.append(option);
    });
    
    const contenedorBotones = document.createElement("div");
    contenedorBotones.style.display = "flex";
    contenedorBotones.style.gap = "10px";
    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.className = "boton-enlace";
    btnGuardar.textContent =
        reserva ? "Actualizar" : "Guardar";
    const btnCancelar = document.createElement("button");
    btnCancelar.type = "button";
    btnCancelar.className = "boton-enlace";
    btnCancelar.textContent = "Cancelar";
    contenedorBotones.append(
        btnGuardar,
        btnCancelar
    );
    formulario.append(
        selectUsuario,
        selectClase,
        selectEstado,
        contenedorBotones
    );

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = {
            idusuario:
                Number(
                    selectUsuario.value
                ),
            idclaseprogramada:
                Number(
                    selectClase.value
                ),
            estado:
                selectEstado.value
        };
        try {
            if (reserva) {
                await api.actualizar(
                    "reservas",
                    reserva.id,
                    {
                        estado: datos.estado
                    }
                );
                alert(
                    "Reserva actualizada correctamente."
                );
            }
            else {
                await api.crear(
                    "reservas",
                    datos
                );
                alert(
                    "Reserva creada correctamente."
                );
            }
            formulario.remove();
            await cargarReservas(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "Ocurrió un error al guardar la reserva."
            );
        }
    });
    return {
        formulario,
        btnCancelar
    };
}