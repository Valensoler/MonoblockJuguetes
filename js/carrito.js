const pintarCarrito = () => {
    productosDelCarrito.innerHTML = "";
    productosDelCarrito.style.display = "flex";
    contenidoDelCarrito.className = "contenidoCarrito"
    contenidoDelCarrito.innerHTML = `
    <h2 class="contenidoCarrito-item"> Mi Carrito </h2>
    `;

    productosDelCarrito.append(contenidoDelCarrito);

    const botonEliminar = document.createElement ("h2");
    botonEliminar.innerText = "X";
    botonEliminar.className = "modal-header-button";

    botonEliminar.addEventListener ("click", () => {
        productosDelCarrito.style.display = "none";
    });

    contenidoDelCarrito.append(botonEliminar);

    carrito.forEach((product) => {
        let todoElCarrito = document.createElement("div");
        todoElCarrito.className = "containerCarrito";
        todoElCarrito.innerHTML = `
            <h6 class = "producto">${product.nombre}</h6>
            <img src="${product.img}">
            <p class ="precioDelProducto"> $ ${product.precio}</p>
            <p class = "cantidades"> Cantidad: ${product.cantidad}</p>
            <p class= "total">Total: ${product.cantidad * product.precio} </p>        
        `;     
        productosDelCarrito.append(todoElCarrito);
                

        let eliminar = document.createElement ("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        todoElCarrito.append (eliminar);

        eliminar.addEventListener ("click", eliminarProducto);
    });

    const total = carrito.reduce ((acc, el) => {
        return acc + el.precio * el.cantidad
    }, 0);

    const compraTotal = document.createElement("div");
    compraTotal.className = "total-content";
    compraTotal.innerHTML = `Total a pagar: $ ${total}`;
    productosDelCarrito.append(compraTotal);

    const pagar = document.createElement("button");
    pagar.className = "total-content";
    pagar.innerHTML = `Ir a pagar`;

    productosDelCarrito.append(pagar);

    pagar.addEventListener ("click", () =>{
        swal.fire({
            title: `Estas por confirmar el pedido`, 
            text: `¿Esta seguro de que quiere finalizar?`,
            icon: `warning`,
            showCancelButton: true,
            confirmButtonText: `Finalizar compra`,
            cancelButtonText: `No, quiero seguir comprando` 
        }).then((respuesta) => {
            if(respuesta.isConfirmed) {
                location.href = "../Secciones/pago.html"
            }
        });
    });
}

miCarrito.addEventListener ("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find ((element) => element.id);

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });

    productosParaComprar ();
    guardarLocal ();
    pintarCarrito ();
}

const productosParaComprar = () => {
    productosPedidos.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem ("carritoLength", JSON.stringify (carritoLength));

    productosPedidos.innerText = JSON.parse (localStorage.getItem("carritoLength")) ;
};

productosParaComprar ();

