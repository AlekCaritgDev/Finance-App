import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { TransferenciasComponent } from './pages/transferencia/transferencia.component';
import { AuthGuard } from './guards/auth.guard';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: SidebarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
      { path: 'gastos', component: GastosComponent, canActivate: [AuthGuard] },
      { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
      { path: 'trasnferencias', component: TransferenciasComponent, canActivate: [AuthGuard] },
      { path: 'crear-cuenta', component: CrearCuentaComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }