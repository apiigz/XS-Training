export async function obtenerDatos(url){
    const respuesta = await fetch(url)
    const objetoDatos = await respuesta.json()
    return objetoDatos
}

export async function obtenerEntrenamientos(){
    try{
        const respuesta = await fetch('https://raw.githubusercontent.com/apiigz/testjsons/refs/heads/main/entrenamientos.json') 
        const entrenamientos = await respuesta.json();
        return entrenamientos;
    }catch(e){
        console.log(e)
    }
}

export async function obtenerTestimonios(){
    try{
        const respuesta = await fetch('https://raw.githubusercontent.com/apiigz/testjsons/refs/heads/main/experiencias.json') 
        const testimonios = await respuesta.json();
        return testimonios;
    }catch(e){
        console.log(e)
    }
}

export async function obtenerProfesores(){
    try{
        const respuesta = await fetch('https://raw.githubusercontent.com/apiigz/testjsons/refs/heads/main/profesores.json') 
        const profesores = await respuesta.json();
        return profesores;
    }catch(e){
        console.log(e)
    }
}

export async function obtenerInscripciones(){
    try{
        const respuesta = await fetch('https://69c566e38a5b6e2dec2c626b.mockapi.io/api/v1/inscripciones.json') 
        const inscripciones = await respuesta.json();
        return inscripciones;
    }
    catch(e){
        console.log(e)
    }
}

export async function obtenerUsuarios(){
    try{
        const respuesta = await fetch('https://69c566e38a5b6e2dec2c626b.mockapi.io/api/v1/usuarios.json') 
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch(e){
        console.log(e)
    }
}

