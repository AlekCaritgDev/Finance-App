export interface Transferencia {
    id?: number;
    cuenta_origen_id: number;
    cuenta_destino_id: number;
    descripcion: string;
    monto: number;
    fecha: string;
  }
  