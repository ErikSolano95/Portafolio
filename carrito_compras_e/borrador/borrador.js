let productos = [
    {id:1, nombre:"McKenzie Logo Overhead Hoodie", precio:200000, img:"https://i8.amplience.net/i/jpl/jd_682735_b?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:2, nombre:"Adidas Originals Linear Overhead Hoodie", precio:320000, img:"https://i8.amplience.net/i/jpl/jd_679648_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:3, nombre:"Official Team Scotland 'Kein Schottland", precio:88000, img:"https://i8.amplience.net/i/jpl/jd_703635_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:4, nombre:"Adidas Originals Long Sleeve Boyfriend Top", precio:150000, img:"https://i8.amplience.net/i/jpl/jd_679655_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:5, nombre:"Adidas Originals Drip Fade Joggers", precio:220000, img:"https://i8.amplience.net/i/jpl/jd_691061_e?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:6, nombre:"Adidas Originals Script T-Shirt", precio:121000, img:"https://i8.amplience.net/i/jpl/jd_683201_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:7, nombre:"Adidas Originals Mono Tape pantalón de chándal", precio:185000, img:"https://i8.amplience.net/i/jpl/jd_663313_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:8, nombre:"sics camiseta Icon", precio:95000, img:"https://i8.amplience.net/i/jpl/jd_624965_a?qlt=92&w=750&h=957&v=1&fmt=auto"},
    {id:9, nombre:"Nike Dunk Low Women's", precio:450000, img:"https://i8.amplience.net/i/jpl/jd_680630_b?qlt=92&w=750&h=531&v=1&fmt=auto"},
    {id:10, nombre:"Nike Dunk Low Twist para mujer", precio:505000, img:"https://i8.amplience.net/i/jpl/jd_668051_b?qlt=92&w=750&h=531&v=1&fmt=auto"},
    {id:11, nombre:"Jordan Air 1 High Zoom CMFT", precio:520000, img:"https://i8.amplience.net/i/jpl/jd_667707_b?qlt=92&w=750&h=531&v=1&fmt=auto"},
    {id:12, nombre:"Nike Air Force 1 '07 LV8", precio:400000, img:"https://i8.amplience.net/i/jpl/jd_597625_a?qlt=92&w=750&h=531&v=1&fmt=auto"},
    
] 


let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  pintar();
  configurarEventosCarrito();
});

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(precio);
}

function pintar() {
  let fragment = document.createDocumentFragment();
  productos.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cards");
    let img = document.createElement("img");
    img.classList.add("imgs");
    img.src = item.img;
    let h2 = document.createElement("h2");
    h2.classList.add("Descripcion");
    h2.textContent = item.nombre;
    let p = document.createElement("p");
    p.classList.add("precio");
    p.textContent = formatearPrecio(item.precio);
    let inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = 1;
    inputCantidad.value = 1;
    let button = document.createElement("button");
    button.classList.add("boton");
    button.textContent = "Agregar al carrito";
    button.addEventListener("click", () => {
      agregarAlCarrito(item, inputCantidad.value);
      actualizarCarrito();
    });

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(inputCantidad);
    div.appendChild(button);
    fragment.appendChild(div);
  });

  document.getElementById("container").appendChild(fragment);
}

function configurarEventosCarrito() {
  const carritoContainer = document.getElementById("carritoContainer");
  const tablaCarrito = document.getElementById("tabla");
  const totalCarrito = document.getElementById("totalCarrito");

  const botonVaciar = document.getElementById("botonVaciar");

  carritoContainer.addEventListener("mouseenter", () => {
    tablaCarrito.style.display = "block";
    botonVaciar.style.display = "block";
    totalCarrito.style.display = "block";  
  });

  carritoContainer.addEventListener("mouseleave", (event) => {
    if (!esHijoDe(event.relatedTarget, carritoContainer)) {
      tablaCarrito.style.display = "none";
      botonVaciar.style.display = "none";
      totalCarrito.style.display = "none";  
    }
  });
}


  


function esHijoDe(elementoHijo, elementoPadre) {
  while (elementoHijo) {
    if (elementoHijo === elementoPadre) {
      return true;
    }
    elementoHijo = elementoHijo.parentNode;
  }
  return false;
}

function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find((item) => item.producto.id === producto.id);

  if (existente) {
    existente.cantidad += parseInt(cantidad);
  } else {
    carrito.push({ producto, cantidad: parseInt(cantidad) });
  }
}

function actualizarCarrito() {
  document.getElementById("tablaBody").innerHTML = "";

  let totalCarrito = 0;

  carrito.forEach((item) => {
    let fila = document.createElement("tr");
    let img = document.createElement("td");
    img.innerHTML = `<img src="${item.producto.img}" alt="${item.producto.nombre}" width="50">`;
    let nombre = document.createElement("td");
    nombre.textContent = item.producto.nombre;
    let precio = document.createElement("td");
    precio.textContent = formatearPrecio(item.producto.precio);
    let cantidad = document.createElement("td");
    cantidad.textContent = item.cantidad;
    let total = document.createElement("td");
    let totalProducto = item.producto.precio * item.cantidad;
    total.textContent = formatearPrecio(totalProducto);
    totalCarrito += totalProducto;
    let acciones = document.createElement("td");
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(item.producto.id);
      actualizarCarrito();
    });

    acciones.appendChild(botonEliminar);

    fila.appendChild(img);
    fila.appendChild(nombre);
    fila.appendChild(precio);
    fila.appendChild(cantidad);
    fila.appendChild(total);
    fila.appendChild(acciones);

    document.getElementById("tablaBody").appendChild(fila);
  });

  
  document.getElementById("totalCarrito").textContent = `Total: ${formatearPrecio(totalCarrito)}`;
}

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter((item) => item.producto.id !== productoId);
}





function calcularTotal() {
    let totalCarrito = 0;
  
    carrito.forEach((item) => {
      totalCarrito += item.producto.precio * item.cantidad;
    });
  
    return totalCarrito;
  }

  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
  }
  
  