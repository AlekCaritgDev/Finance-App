// src/app/services/cuentas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  private apiUrl = 'http://localhost:3000/api/cuentas';  // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener las cuentas de un usuario
  getCuentas(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Crear una nueva cuenta
  crearCuenta(cuenta: any): Observable<any> {
    return this.http.post(this.apiUrl, cuenta);
  }

  // Eliminar una cuenta
  eliminarCuenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
