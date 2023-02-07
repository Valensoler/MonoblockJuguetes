const tienda = document.getElementById ("tienda");
const miCarrito = document.getElementById ("verCarrito");
const contenidoDelCarrito= document.createElement("div");
const botonEliminar = document.createElement("h4");
const productosDelCarrito = document.getElementById("productosDelCarrito");
const productosPedidos = document.getElementById ("productosPedidos");
let carrito = JSON.parse (localStorage.getItem ("productos")) || [];

productos.forEach ((product) => {
    let contenedor = document.createElement ("div");
    contenedor.className = "cards";
    contenedor.innerHTML = `
    <h6> ${product.nombre} </h6>
    <img src = "${product.img}">
    <p class="precios"> $ ${product.precio} </p>
    `;

    tienda.append (contenedor);

    let agregar = document.createElement ("button")
    agregar.className = "agregar";
    agregar.innerText= "Agregar al carrito";

    contenedor.append (agregar);

    agregar.addEventListener ("click", () => {
    
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
});

const guardarLocal = () => {
    localStorage.setItem("productos", JSON.stringify (carrito));
};
