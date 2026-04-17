import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PerfilComponent } from './components/perfil/perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent }
];