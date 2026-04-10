async function obtenerDatos(url){
    const respuesta = await fetch(url)
    const objetoDatos = await respuesta.json()
    return objetoDatos
}

export {obtenerDatos}