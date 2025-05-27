export interface Gasto {
    cuenta_id?: number;  // ← opcional
    categoria_id: number;
    tipo: string;
    descripcion: string;
    monto: number;
    fecha: string;
  }
  