export interface Cuenta {
    id: number;
    usuario_id: number;
    nombre: string;
    tipo: 'Ahorros' | 'Corriente';
    saldo: number;
    moneda: string;
    created_at: string;
  }
  