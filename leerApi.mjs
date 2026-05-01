try{
    const respuesta = await fetch('https://raw.githubusercontent.com/apiigz/testjsons/refs/heads/main/entrenamientos.json') //=> es una ruta URL.
    //Extraemos del cuerpo de la peticion de los datos
    const entrenamientos = await respuesta.json();
    console.log(entrenamientos) //<= Transforma el cuerpo "cadenas de texto" a un objeto/arreglo de JavaScript
}catch(e){
    console.log(e)
}