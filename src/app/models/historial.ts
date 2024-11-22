export class Historial {
  id: number;
  nombre: string;
  cantidad: number;
  fecha: string;

  constructor(id: number, nombre: string, fecha: string, cantidad: number) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.cantidad = cantidad;
  }
}
