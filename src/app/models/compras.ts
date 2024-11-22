

export class compras {
  Id_Compra: number;
  Id_user: string;
  Cantidad: number;
  Id_Producto: number;
  Fecha_Compra: string;
  id_pago: number;

  constructor(
    Id_Compra: number,
    Id_user: string,
    Cantidad: number,
    Id_Producto: number,
    Fecha_Compra: string,
    id_pago: number,
  ) {
    this.Id_Compra = Id_Compra;
    this.Id_user = Id_user;
    this.Cantidad = Cantidad;
    this.Id_Producto = Id_Producto;
    this.Fecha_Compra = Fecha_Compra;
    this.id_pago = id_pago;
  }
}
