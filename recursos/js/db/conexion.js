if (!localStorage.getItem("usuarios")) {
    fetch('./datos/usuarios.json').then(res => res.json()).then(data => {
            localStorage.setItem("usuarios", JSON.stringify(data));
            console.log("Usuarios cargados desde JSON a localStorage");
        });
}

if (!localStorage.getItem("experiencias")) {
    fetch('./datos/experiencias.json').then(res => res.json()).then(data => {
            localStorage.setItem("experiencias", JSON.stringify(data));
            console.log("Experiencias cargados desde JSON a localStorage");
        });
}

if (!localStorage.getItem("inscripciones")) {
    fetch('./datos/inscripciones.json').then(res => res.json()).then(data => {
            localStorage.setItem("inscripciones", JSON.stringify(data));
            console.log("Inscripciones cargadas desde JSON a localStorage");
        });
}