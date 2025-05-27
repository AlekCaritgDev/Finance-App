import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CuentasService } from '../../services/cuentas.service';
import { Cuenta } from '../../interfaces/cuenta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports:[CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  cuentas: Cuenta[] = [];

  constructor(
    private authService: AuthService,
    private cuentasService: CuentasService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    if (this.usuario && this.usuario.id) {
      this.cargarCuentas();
    } else {
      console.error('⚠️ Usuario no autenticado');
    }
  }

  cargarCuentas(): void {
    this.cuentasService.getCuentas(this.usuario.id).subscribe({
      next: (data) => {
        this.cuentas = data;
        console.log('Cuentas del usuario:', data);
      },
      error: (err) => {
        console.error('Error al cargar cuentas:', err);
      }
    });
  }
  
  eliminarCuenta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cuenta?')) {
      this.cuentasService.eliminarCuenta(id).subscribe(() => {
        this.cargarCuentas(); // Refrescar la lista de cuentas
      });
    }
  }
  
}
