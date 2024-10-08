export class Producto {
  id: number;
  nombre: string;
  cod: string;
  talle_peso: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string;

  constructor(
    id: number,
    nombre: string,
    cod: string,
    talle_peso: string,
    descripcion: string,
    categoria: string,
    precio: number,
    stock: number,
    imagen: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.cod = cod;
    this.talle_peso = talle_peso;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }
}
