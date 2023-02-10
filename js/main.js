const tienda = document.getElementById ("tienda");
const miCarrito = document.getElementById ("verCarrito");
const productosDelCarrito = document.getElementById("productosDelCarrito");
const productosPedidos = document.getElementById ("productosPedidos");
let carrito = JSON.parse (localStorage.getItem ("productos")) || [];

const listadoProductos = "js/productos.json";

fetch (listadoProductos)
    .then (respuesta => respuesta.json ())
    .then (productos =>{
        productos.forEach ((producto) => {
            const divProductos = document.createElement ("div")
            divProductos.innerHTML = `
                                    <div>
                                        <h6> ${producto.nombre} </h6>
                                        <img src = "${producto.img}">
                                        <p class="precios"> $ ${producto.precio} </p>
                                        <button id ="boton" ${producto.id}> Agregar al carrito </button>
                                    </div>`;
            tienda.append (divProductos)
        }) 

        const boton = document.getElementById(`button-${productos.id}`);
        boton.addEventListener("click", () => {
        agregarAlCarrito(productos.id);
    });
});

const carritoDelUsuario = [];

    const agregarAlCarrito = (id) => {
        const producto = productos.find ((producto) => producto.id === id);
        const productoEnCarrito = carritoDelUsuario.find ((producto) => producto.id === id);
        if (productoEnCarrito){
            productoEnCarrito.cantidad++;
        } else{
            carritoDelUsuario.push (producto);
        }
        
        actualizarCarrito ();
    };

    miCarrito.addEventListener("click", actualizarCarrito)

    function actualizarCarrito() {
        let aux = '';
        carritoDelUsuario.forEach((producto) => {
        aux = `
                <div class="card col-xl-3 col-md-6 col-sm-12">
                    <div class="card-body">
                        <h6> ${producto.nombre} </h6>
                        <img src = "${producto.img}">
                        <p class="precios"> $ ${producto.precio} </p>
                        <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                        </div>
                    </div>
                    `;
        });

        contenedorCarrito.innerHTML = aux;
        calcularTotalCompra();
    }

    const eliminarDelCarrito = (id) => {
        const producto = carritoDelUsuario.find((producto) => producto.id === id);
        carritoDelUsuario.splice(carritoDelUsuario.indexOf(producto), 1);
        actualizarCarrito();
    };

    const vaciarCarrito = document.getElementById('vaciarElCarrito');
        vaciarCarrito.addEventListener("click", () => {
        carrito.splice (0, carrito.length);
        actualizarCarrito();
    });

    const totalCompra = document.getElementById('totalCompra');

    const calcularTotalCompra = () => {
        let total = 0;
        carritoDelUsuario.forEach((producto) => {
        total += producto.precio * producto.cantidad;
        });
        totalCompra.innerHTML = total;
    };


    guardarLocal ();

    const guardarLocal = () => {
        localStorage.setItem("productos", JSON.stringify (carrito));
    };

