import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CuentasService } from '../../services/cuentas.service';
import { Cuenta } from '../../interfaces/cuenta';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MovimientosService } from '../../services/movimientos.service';
import { Gasto } from '../../interfaces/gasto';
import { Categoria } from '../../interfaces/categoria';
import { Transferencia } from '../../interfaces/trasnferencia';
import { TransferenciaService } from '../../services/trasnferencias.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  usuario: any = null;
  cuentas: Cuenta[] = [];
  categorias: Categoria[] = [];
  activeIndex = 0;
  gastos: Gasto[] = [];
  mostrarGastos = true;
  transferencias: Transferencia[] = [];
  mostrarTransferencias = false;

  constructor(
    private cuentasService: CuentasService,
    private authService: AuthService,
    private router: Router,
    private movimientosService: MovimientosService,
    private transferenciaService: TransferenciaService
  ) {}

  ngOnInit(): void {
    console.log('Dashboard cargado');
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    this.usuario = this.authService.getUser();

    if (!token || !usuario || !this.usuario?.id) {
      console.error('❌ Usuario no válido, redirigiendo al login');
      this.router.navigate(['/login']);
      return;
    }

    this.listarCuentas();
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.movimientosService.obtenercategorias().subscribe({
      next: (data) => {
        this.categorias = data.filter(cat => cat.tipo === 'Gasto');
      },
      error: (err) => console.error('❌ Error cargando categorías', err)
    });
  }

  listarCuentas(): void {
    if (!this.usuario?.id) return;
    this.cuentasService.getCuentas(this.usuario.id).subscribe({
      next: (data) => {
        this.cuentas = data;
        console.log('Cuentas:', this.cuentas);
      },
      error: (error) => {
        console.error('❌ Error al listar cuentas', error);
      }
    });
  }

  verGastos(): void {
    if (!this.usuario?.id) return;

    this.mostrarGastos = true;
    this.mostrarTransferencias = false;

    this.movimientosService.obtenerGastos(this.usuario.id).subscribe({
      next: (data) => {
        this.gastos = data;
        console.log('✅ Gastos:', this.gastos);
      },
      error: (error) => {
        console.error('❌ Error al cargar los gastos', error);
      }
    });
  }

  verTransferencias(): void {
    if (!this.usuario?.id) return;
  
    this.mostrarTransferencias = true;
    this.mostrarGastos = false;
  
    this.transferenciaService.obtenerTransferencias(this.usuario.id).subscribe({
      next: (data) => {
        this.transferencias = data;
        console.log('✅ Transferencias:', this.transferencias);
      },
      error: (error) => {
        console.error('❌ Error al cargar transferencias', error);
      }
    });
  }
  
    

  obtenerNombreCuenta(id: number): string {
    const cuenta = this.cuentas.find(c => c.id === id);
    return cuenta ? cuenta.nombre : `Cuenta #${id}`;  // Devuelve un nombre por defecto si no encuentra la cuenta
  }
  
  obtenerTipoCuenta(id: number): string {
    const cuenta = this.cuentas.find(c => c.id === id);
    return cuenta ? cuenta.tipo : 'Tipo desconocido';  // Devuelve un tipo por defecto si no encuentra la cuenta
  }
  

  obtenerNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Categoría desconocida';
  }

  irAAnadirCuenta(): void {
    this.router.navigate(['/perfil']);
  }

  onSlideChange(index: number): void {
    this.activeIndex = index;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
