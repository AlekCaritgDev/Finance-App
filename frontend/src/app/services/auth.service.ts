import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api/auth';
  private usuario: Usuario | null = null; // 🔥 Controlar usuario en memoria

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser(); // 🔥 Al arrancar el servicio, cargamos el usuario desde localStorage
  }

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.saveUser(response.user);
        })
      );
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: Usuario) {
    this.usuario = user; // 🔥 Guardar también en memoria
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  loadUser() {
    const user = localStorage.getItem('usuario');
    if (user) {
      this.usuario = JSON.parse(user) as Usuario;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): Usuario | null {
    return this.usuario; // 🔥 Siempre saca el valor en memoria
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}
