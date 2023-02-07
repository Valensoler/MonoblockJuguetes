const botonBorrar = document.getElementById('boton-borrar');
botonBorrar.addEventListener('click', () => {
Swal.fire({
    title: '¿Esta seguro que quiere finalizar su compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Finalizar',
    cancelButtonText: 'No, quiero seguir comprando'
}).then((resultado) => {
    if (resultado.isConfirmed) {
    Swal.fire({
        title: 'Borrado!',
        icon: 'success',
        text: 'El archivo ha sido borrado'
    })
    }
})
})