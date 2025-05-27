import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TransferenciaService } from '../../services/trasnferencias.service';
import { Cuenta } from '../../interfaces/cuenta';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css'],
})
export class TransferenciasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  usuario: any;

  transferenciaForm!: FormGroup;

  constructor(
    private transferenciaService: TransferenciaService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    if (!this.usuario?.id) {
      console.error('Usuario no válido');
      return;
    }

    this.transferenciaForm = this.fb.group({
      monto: [0, [Validators.required, Validators.min(0.01)]],
      cuenta_origen_id: [null, Validators.required],
      cuenta_destino_id: [null, Validators.required],
      descripcion: ['']
    });

    this.cargarCuentas();
  }

  cargarCuentas(): void {
    this.transferenciaService.getCuentas(this.usuario.id).subscribe({
      next: (data) => {
        this.cuentas = data;
      },
      error: (error) => {
        console.error('❌ Error al cargar cuentas', error);
      },
    });
  }

  crearTransferencia(): void {
    if (this.transferenciaForm.invalid) return;

    const nueva = {
      ...this.transferenciaForm.value,
      fecha: new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
    };

    this.transferenciaService.crearTransferencia(nueva).subscribe({
      next: () => {
        alert('✅ Transferencia realizada');
        // No es necesario obtener las transferencias en este componente.
        this.transferenciaForm.reset({ monto: 0, cuenta_origen_id: null, cuenta_destino_id: null, descripcion: '' });
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          alert(`❌ ${err.error.message}`);
        } else {
          alert('❌ Error al crear transferencia');
        }
        console.error(err);
      }
    });
  }
}
