import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html' 
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Validaciones básicas: Campos obligatorios
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.loginForm.value;

    this.apiService.login(correo, contrasena).subscribe({
      next: (res) => {
        // Si son correctas permitir acceso
        // Guardamos el ID del usuario en localStorage para usarlo en el perfil 
        localStorage.setItem('usuario_id', res.usuario.id);
        this.router.navigate(['/perfil']); // Redirigimos al perfil
      },
      error: (err) => {
        // Si son incorrectas -> mostrar mensaje 
        if (err.status === 401) {
          this.mensajeError = 'Credenciales incorrectas'; 
        } else {
          this.mensajeError = 'Error al conectar con el servidor';
        }
      }
    });
  }
}