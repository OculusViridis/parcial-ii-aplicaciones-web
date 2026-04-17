import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './perfil.html',
  styles: [`
    .full-width { width: 100%; margin-bottom: 10px; }
    .card-container { max-width: 500px; margin: 40px auto; }
  `]
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  usuarioId: number = 0;
  existePerfil: boolean = false; // Bandera para saber si hacemos POST o PUT
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Definimos los campos y sus validaciones [cite: 43-52, 56]
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]], // Edad numérica y mayor a 0
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]] // Exactamente 8 dígitos
    });
  }

  ngOnInit(): void {
    // Recuperamos el ID del usuario que guardamos en el login
    const id = localStorage.getItem('usuario_id');
    
    if (!id) {
      // Si no hay ID, lo regresamos al login por seguridad
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioId = Number(id);
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.apiService.obtenerPerfil(this.usuarioId).subscribe({
      next: (res) => {
        // Si el perfil existe, llenamos el formulario y cambiamos la bandera
        this.existePerfil = true;
        this.perfilForm.patchValue({
          nombre: res.perfil.nombre,
          apellido: res.perfil.apellido,
          edad: res.perfil.edad,
          correo: res.perfil.correo,
          telefono: res.perfil.telefono
        });
      },
      error: (err) => {
        // Si da error 404, significa que es un usuario nuevo sin perfil, lo dejamos en blanco
        if (err.status === 404) {
          this.existePerfil = false;
        }
      }
    });
  }

  onSubmit() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    // Armamos el objeto combinando el ID del usuario con los datos del formulario
    const datosPerfil = {
      usuario_id: this.usuarioId,
      ...this.perfilForm.value
    };

    if (this.existePerfil) {
      // Si existe, actualizamos (PUT)
      this.apiService.actualizarPerfil(datosPerfil).subscribe({
        next: () => this.mostrarMensaje('Perfil actualizado correctamente', 'exito'),
        error: () => this.mostrarMensaje('Error al actualizar el perfil', 'error')
      });
    } else {
      // Si no existe, creamos (POST)
      this.apiService.crearPerfil(datosPerfil).subscribe({
        next: () => {
          this.mostrarMensaje('Perfil creado correctamente', 'exito');
          this.existePerfil = true; // Ahora ya existe
        },
        error: () => this.mostrarMensaje('Error al crear el perfil', 'error')
      });
    }
  }

  // Método auxiliar para mostrar mensajes en pantalla
  mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    if (tipo === 'exito') {
      this.mensajeExito = texto;
      this.mensajeError = '';
    } else {
      this.mensajeError = texto;
      this.mensajeExito = '';
    }
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    }, 3000);
  }
}