import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // La URL base de tu backend en Node
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // --- 1. LOGIN ---
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { correo, contrasena });
  }

  // --- 2. PERFIL ---
  obtenerPerfil(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/perfil?usuario_id=${usuarioId}`);
  }

  crearPerfil(datosPerfil: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/perfil`, datosPerfil);
  }

  actualizarPerfil(datosPerfil: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/perfil`, datosPerfil);
  }
}