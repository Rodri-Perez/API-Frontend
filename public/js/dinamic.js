// async function obtenerTodo() {
//   const response = await fetch(
//     "https://olimpiadas-backend-production.up.railway.app/api/v1/productos/"
//   );
//   const datos = await response.json();

//   return datos;
// }

// async function mostrarProductos() {
//   const container = document.querySelectorAll("#Hola")[0];
//   const spinner = document.querySelectorAll(".spinner-border")[0];
//   const productos = await obtenerTodo();
//   container.classList.remove("d-none");
//   spinner.remove();
//   table = document.querySelectorAll("tbody")[0];

//   productos.forEach((producto) => {
//     tr = document.createElement("tr");
//     nombre = document.createElement("th");
//     categoria = document.createElement("td");
//     descripcion = document.createElement("td");
//     talle = document.createElement("td");
//     stock = document.createElement("td");
//     precio = document.createElement("td");

//     nombre.scope = "row";

//     nombre.innerText = producto.nombre;
//     categoria.innerText = producto.categoria;
//     descripcion.innerText = producto.descripcion;
//     talle.innerText = producto.talle_peso;
//     stock.innerText = producto.stock;
//     precio.innerText = producto.precio;

//     tr.appendChild(nombre);
//     tr.appendChild(categoria);
//     tr.appendChild(descripcion);
//     tr.appendChild(talle);
//     tr.appendChild(stock);
//     tr.appendChild(precio);

//     table.appendChild(tr);
//   });

//   productos.forEach((e) => {
//     console.log(e);
//   });
// }

// mostrarProductos();
