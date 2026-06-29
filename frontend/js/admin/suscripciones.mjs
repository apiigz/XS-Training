import * as api from "./apiAdmin.mjs";

export async function cargarSuscripciones(panel) {
    try {
        const suscripciones =
            await api.obtener("suscripciones");
        panel.replaceChildren();
        const titulo = document.createElement("h2");
        titulo.textContent = "SUSCRIPCIONES";
        titulo.style.color = "yellow";
        titulo.style.marginBottom = "20px";
        panel.append(titulo);
        const btnNuevo = document.createElement("button");
        btnNuevo.textContent = "+ Nueva suscripción";
        btnNuevo.className = "boton-enlace";
        btnNuevo.style.marginBottom = "20px";
        btnNuevo.addEventListener("click", async () => {
            const usuarios =
                await api.obtener("usuarios");
            const entrenamientos =
                await api.obtener("entrenamientos");
            const {
                formulario,
                btnCancelar
            } = mostrarFormulario(
                panel,
                usuarios,
                entrenamientos
            );
            panel.prepend(formulario);
            btnNuevo.disabled = true;
            btnCancelar.addEventListener("click", () => {
                formulario.remove();
                btnNuevo.disabled = false;
            });
        });
        panel.append(btnNuevo);
        suscripciones.forEach(suscripcion => {
            panel.append(
                crearTarjeta(
                    suscripcion,
                    panel
                )
            );
        });
    }
    catch (error) {
        console.error(error);
        panel.innerHTML = `
            <p style="color:red;">
                Error cargando las suscripciones.
            </p>
        `;
    }
}
function crearTarjeta(suscripcion, panel) {
    const card = document.createElement("article");
    card.className = "suscripcion-contenedor";
    const usuario = document.createElement("h2");
    usuario.textContent = suscripcion.nombreusuario;
    const entrenamiento = document.createElement("p");
    entrenamiento.textContent =
        `Entrenamiento: ${suscripcion.nombreentrenamiento}`;
    const fechaPago = document.createElement("p");
    fechaPago.textContent =
        `Fecha de pago: ${suscripcion.fechapago}`;
    const fechaVencimiento = document.createElement("p");
    fechaVencimiento.textContent =
        `Vence: ${suscripcion.fechavencimiento}`;
    const monto = document.createElement("p");
    monto.textContent =
        `Monto: $${suscripcion.monto}`;
    const estado = document.createElement("p");
    estado.textContent =
        `Estado: ${suscripcion.estado}`;
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
        const entrenamientos =
            await api.obtener("entrenamientos");
        const {
            formulario,
            btnCancelar
        } = mostrarFormulario(
            panel,
            usuarios,
            entrenamientos,
            suscripcion
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
            `¿Eliminar la suscripción de "${suscripcion.nombreusuario}"?`
        );
        if (!confirmar)
            return;
        try {
            await api.eliminar(
                "suscripciones",
                suscripcion.id
            );
            alert(
                "Suscripción eliminada correctamente."
            );
            await cargarSuscripciones(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "No se pudo eliminar la suscripción."
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
        fechaPago,
        fechaVencimiento,
        monto,
        estado,
        acciones
    );
    return card;
}
function mostrarFormulario(panel, usuarios, entrenamientos, suscripcion = null) {
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
        if (suscripcion && suscripcion.idusuario == usuario.id)
            option.selected = true;
        selectUsuario.append(option);
    });
    
    const selectEntrenamiento = document.createElement("select");
    entrenamientos.forEach(entrenamiento => {
        const option = document.createElement("option");
        option.value = entrenamiento.id;
        option.textContent = entrenamiento.nombre;
        if (suscripcion && suscripcion.identrenamiento == entrenamiento.id)
            option.selected = true;
        selectEntrenamiento.append(option);
    });
    
    const inputFechaPago = document.createElement("input");
    inputFechaPago.type = "date";
    inputFechaPago.value =
        suscripcion?.fechapago?.substring(0,10) ?? "";

    const inputFechaVencimiento = document.createElement("input");
    inputFechaVencimiento.type = "date";
    inputFechaVencimiento.value =
        suscripcion?.fechavencimiento?.substring(0,10) ?? "";

    const inputMonto = document.createElement("input");
    inputMonto.type = "number";
    inputMonto.step = "0.01";
    inputMonto.placeholder = "Monto";
    inputMonto.value = suscripcion?.monto ?? "";
    
    const selectEstado = document.createElement("select");
    const estados = [
        "pago",
        "vencido",
        "pendiente"
    ];
    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado;
        option.textContent = estado;
        if (suscripcion && suscripcion.estado === estado)
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
        suscripcion ? "Actualizar" : "Guardar";
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
        selectEntrenamiento,
        inputFechaPago,
        inputFechaVencimiento,
        inputMonto,
        selectEstado,
        contenedorBotones
    );
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = {
            idusuario:
                Number(selectUsuario.value),
            identrenamiento:
                Number(selectEntrenamiento.value),
            fechapago:
                inputFechaPago.value,
            fechavencimiento:
                inputFechaVencimiento.value,
            monto:
                Number(inputMonto.value),
            estado:
                selectEstado.value
        };
        if (
            !datos.fechapago ||
            !datos.fechavencimiento ||
            !datos.monto
        ) {
            alert("Complete todos los campos.");
            return;
        }
        try {
            if (suscripcion) {
                await api.actualizar(
                    "suscripciones",
                    suscripcion.id,
                    datos
                );
                alert(
                    "Suscripción actualizada correctamente."
                );
            }
            else {
                await api.crear(
                    "suscripciones",
                    datos
                );
                alert(
                    "Suscripción creada correctamente."
                );
            }
            formulario.remove();
            await cargarSuscripciones(panel);
        }
        catch (error) {
            console.error(error);
            alert(
                "Ocurrió un error al guardar la suscripción."
            );
        }
    });
    return {
        formulario,
        btnCancelar
    };
}