import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../interfaces/trasnferencia';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = 'http://localhost:3000/api/transferencias';
  private apiUrlcuentas = 'http://localhost:3000/api/cuentas';

  constructor(private http: HttpClient) {}

  crearTransferencia(data: Partial<Transferencia>): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ Ahora sin usuarioId y con token
  obtenerTransferencias(usuarioId: number): Observable<Transferencia[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Transferencia[]>(`${this.apiUrl}/${usuarioId}`, { headers });
  }

  getCuentas(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrlcuentas}/${usuarioId}`);
  }
}
