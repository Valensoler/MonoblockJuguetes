const tienda = document.getElementById ("tienda");
const miCarrito = document.getElementById ("verCarrito");
const contenidoDelCarrito= document.createElement("div");
const botonEliminar = document.createElement("h4");
const productosDelCarrito = document.getElementById("productosDelCarrito");
const productosPedidos = document.getElementById ("productosPedidos");
let carrito = JSON.parse (localStorage.getItem ("productos")) || [];

const listadoProductos = "js/productos.json";

fetch (listadoProductos)
    .then (respuesta => respuesta.json ())
    .then (datos =>{
        datos.forEach (product => {
            const divProductos = document.createElement ("div")
            divProductos.innerHTML = `
                                <h6> ${product.nombre} </h6>
                                <img src = "${product.img}">
                                <p class="precios"> $ ${product.precio} </p>
                                <button id = "btn"> Agregar al carrito </button>
                                `;
            tienda.append (divProductos)
        }) 
        const nuevoBtn = document.getElementById ("btn")

        nuevoBtn.addEventListener("click", () => {

        const repetido = carrito.some ((productoRepetido) => productoRepetido.id === product.id);

        if (repetido === true){

            carrito.map ((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                }
            })
        }else {
            carrito.push ({
                id : product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        productosParaComprar ();
        guardarLocal ();
    });

    const guardarLocal = () => {
        localStorage.setItem("productos", JSON.stringify (carrito));
    };
});

let arrayGlobal = []
fetch(productos.json)
    .then(resp=>resp.json())
    .then(productos=> arrayGlobal=productos)

arrayGlobal.forEach((prod)=>console.log(prod))
