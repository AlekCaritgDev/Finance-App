import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { Gasto } from '../../interfaces/gasto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos',
  // Si el componente no es standalone, deberías importar los módulos en el NgModule donde se declara este componente
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']  // Asegúrate de que esté correctamente escrito 'styleUrls'
})
export class GastosComponent implements OnInit {

  categorias: Categoria[] = [];
  nuevoGasto: Gasto = {
    cuenta_id: 1,  // Este valor puede ser dinámico según el usuario logueado
    categoria_id: 1, // Este valor también puede ser dinámico, según las categorías disponibles
    tipo: 'Gasto',
    descripcion: '',
    monto: 0,
    fecha: ''
  };

  constructor(private movimientosService: MovimientosService) { }

  ngOnInit(): void {
    this.cargarcategorias();

  }

  // Método para cargar las categorías de la API
  cargarcategorias(): void {
    this.movimientosService.obtenercategorias().subscribe({
      next: data => {
        console.log('✅ Categorías recibidas:', data);
        this.categorias = data.filter(cat => cat.tipo === 'Gasto');
      },
      error: err => console.error('❌ Error cargando categorías', err)
    });
  }

  // Método para crear un nuevo gasto
  // Método para enviar el gasto al backend
  crearGasto(): void {
    if (this.nuevoGasto.monto <= 0) {
      alert('El monto debe ser mayor que 0');
      return;
    }

    this.movimientosService.crearGasto(this.nuevoGasto).subscribe({
      next: (response) => {
        console.log('Gasto creado correctamente:', response);
        alert(response.message); // Mostrar el mensaje de éxito
        this.nuevoGasto = {  // Reiniciar el formulario después de crear el gasto
          cuenta_id: 1,
          categoria_id: 1,
          tipo: 'Gasto',
          descripcion: '',
          monto: 0,
          fecha: ''
        };
      },
      error: (error) => {
        console.log(error);  // Verifica la estructura del error en la consola
        if (error.status === 400 && error.error.message === 'No tienes suficiente saldo para realizar este gasto') {
          alert('❌ No tienes suficiente saldo para realizar este gasto');
        } else {
          console.error('Error al crear gasto:', error);
          alert('❌ Error al crear gasto');
        }
      }
      
    });
  }

}
