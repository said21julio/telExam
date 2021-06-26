import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { HomeComponent } from './home/home.component';
import { TraficoComponent } from './trafico/trafico.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trafico', component: TraficoComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'detalle-usuario', component: DetalleUsuarioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
