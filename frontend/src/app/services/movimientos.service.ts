import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../interfaces/gasto';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl = 'http://localhost:3000/api/gastos'; // URL del backend
  private categoriassurl = 'http://localhost:3000/api/categorias'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para crear un gasto
  crearGasto(gasto: Gasto): Observable<any> {
    const token = localStorage.getItem('token'); // o sessionStorage según lo que uses
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<any>(this.apiUrl, gasto, { headers });
  }

  obtenercategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriassurl)
  }

  obtenerGastos(usuarioId: number): Observable<Gasto[]> {
    const token = localStorage.getItem('token'); // o sessionStorage según lo que uses
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Gasto[]>(`${this.apiUrl}/${usuarioId}`, { headers });
  }
  

}
