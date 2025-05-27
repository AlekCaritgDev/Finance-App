import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private urlapi = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) { }

  obtenercategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlapi)
  }

  crearCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(this.urlapi, categoria);
  }
}
