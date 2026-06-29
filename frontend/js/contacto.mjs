document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementById('form-testimonio');
    if (!formulario) {
        formulario = document.querySelector('.experiencia form');
    }
    if (!formulario) {
        console.error();
        return;
    }
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const txtAutor = document.getElementById('id-autor').value;
        const txtComentario = document.getElementById('id-experiencia').value;
        const datos = {
            autor: txtAutor,
            contenido: txtComentario
        };
        try {
            const respuesta = await fetch('http://localhost:3000/api/testimonios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            if (respuesta.ok) {
                alert(resultado.mensaje);
                formulario.reset(); 
            } else {
                alert(resultado.error || 'Hubo un error al procesar el testimonio.');
            }
        } catch (error) {
            console.error('Error en la conexión fetch:', error);
            alert('Error de red: No se pudo establecer conexión con el servidor.');
        }
    });
});