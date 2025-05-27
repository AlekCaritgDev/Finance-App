import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y FormGroup
import { Categoria } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  crearCategoriaForm!: FormGroup; // Formulario reactivo



  constructor(
    private categoriaservice: CategoriasService,
    private fb: FormBuilder // Inyectamos el FormBuilder

  ) { }

  ngOnInit(): void {
    this.cargarcategorias();
    this.iniciarFormulario(); // Inicializamos el formulario
  }

  // Inicializa el formulario con validaciones
  iniciarFormulario(): void {
    this.crearCategoriaForm = this.fb.group({
      nombre: ['', [Validators.required]], // El campo nombre es obligatorio
      tipo: ['', [Validators.required]] // El campo tipo es obligatorio
    });
  }

  cargarcategorias(): void {
    this.categoriaservice.obtenercategorias().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('❌ Error cargando categorías', err)
    });
  }

  crearcategoria(): void {
    if (this.crearCategoriaForm.invalid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Recogemos los valores del formulario
    const nuevaCategoria: Categoria = this.crearCategoriaForm.value;

    this.categoriaservice.crearCategoria(nuevaCategoria).subscribe({
      next: () => {
        this.crearCategoriaForm.reset(); // Limpiar formulario
        this.cargarcategorias(); // Recargar lista de categorías
        this.cerrarModal(); // Cerrar el modal después de crear
      },
      error: (err) => {
        console.error('❌ Error al crear categoría', err);
        alert('Error al crear la categoría');
      }
    });
  }

  // Método para abrir el modal
  abrirModal(): void {
    const modalElement = document.getElementById('crearModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  // Método para cerrar el modal
  cerrarModal(): void {
    const modal = document.getElementById('crearModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.hide();
    }
  }
}
