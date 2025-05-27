import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../../services/cuentas.service';
import { Cuenta } from '../../interfaces/cuenta';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {
  cuentas: Cuenta[] = [];
  nuevaCuenta: Partial<Cuenta> = {
    nombre: '',
    tipo: 'Corriente',
    saldo: 0,
    moneda: 'EUR'
  };

  usuario: any = null;

  constructor(
    private cuentasService: CuentasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUser(); // Asegúrate de que este método devuelva un objeto con un id válido
    console.log('Usuario:', this.usuario); // Verifica que el usuario tiene la propiedad 'id'
    if (this.usuario && this.usuario.id) {
      this.listarCuentas();
    } else {
      console.error('Usuario no autenticado o sin id');
    }
  }
  

  listarCuentas() {
    if (this.usuario && this.usuario.id) {
      this.cuentasService.getCuentas(this.usuario.id).subscribe(data => {
        this.cuentas = data;
        console.log('Cuentas:', this.cuentas); // Verifica que se están recuperando las cuentas
      }, error => {
        console.error('Error al listar cuentas', error);
      });
    }
  }

  // Crear una nueva cuenta asociada al usuario
  crearCuenta(): void {
    if (this.usuario && this.usuario.id) {
      console.log('Creando cuenta para el usuario con id:', this.usuario.id); // Verifica que el id sea correcto
      const cuentaConUsuario = { ...this.nuevaCuenta, usuario_id: this.usuario.id }; // Asegúrate de incluir el usuario_id
      this.cuentasService.crearCuenta(cuentaConUsuario).subscribe(() => {
        console.log('Cuenta creada exitosamente');
        this.nuevaCuenta = { nombre: '', tipo: 'Corriente', saldo: 0, moneda: 'EUR' }; // Limpiar el formulario
        this.listarCuentas(); // Refrescar la lista de cuentas
      }, error => {
        console.error('Error al crear cuenta', error);
      });
    } else {
      console.error('El usuario no está autenticado o el id es nulo');
    }
  }
  

  eliminarCuenta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cuenta?')) {
      this.cuentasService.eliminarCuenta(id).subscribe(() => {
        this.listarCuentas(); // Refrescar la lista de cuentas
      });
    }
  }
}
