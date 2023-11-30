import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './vistas/listar-estudiantes/table.component';
import { HomeComponent } from './vistas/Panel de Control/home.component';
import { ReportesComponent } from './vistas/reportes/reportes.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { AulasComponent } from './vistas/aulas-secundaria/aulas.component';
import { AgregarEstudianteComponent } from './vistas/agregar-estudiante/agregar-estudiante.component';
import { ActualizarEstudianteComponent } from './vistas/actualizar-estudiante/actualizar-estudiante.component';
import { DetallesEstudiantesComponent } from './vistas/detalles-estudiantes/detalles-estudiantes.component';
import { ListarInactivosComponent } from './vistas/listar-inactivos-estudiantes/listar-inactivos.component';
import { AulasPrimariaComponent } from './vistas/aulas-primaria/aulas-primaria.component';
import { ActualizarUsuarioComponent } from './vistas/actualizar-usuario/actualizar-usuario.component';
import { AgregarUsuarioComponent } from './vistas/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosInactivosComponent } from './vistas/listar-usuarios-inactivos/listar-usuarios-inactivos.component';
import { SalonesComponent } from './vistas/aulas-secundaria/salones/salones.component';
import { AgregarAulaSecundariaComponent } from './vistas/aulas-secundaria/agregar-aula-secundaria/agregar-aula-secundaria.component';
import { AgregarAulaPrimariaComponent } from './vistas/aulas-primaria/agregar-aula-primaria/agregar-aula-primaria.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActualizarAulaComponent } from './vistas/aulas-secundaria/actualizar-aula/actualizar-aula.component';

const routes: Routes = [
    {path: '', component: SidebarComponent},
    {path: 'panel-de-control', component: HomeComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'aulas/secundaria', component: AulasComponent},
    {path: 'salon/:id', component: SalonesComponent},
    {path: 'aulas/secundaria/agregar', component: AgregarAulaSecundariaComponent},
    {path: 'aulas/secundaria/actualizar/:id', component: ActualizarAulaComponent},
    {path: 'aulas/primaria', component: AulasPrimariaComponent},
    {path: 'inactivos', component: ListarInactivosComponent},
    {path: 'agregar-estudiante/:id', component: AgregarEstudianteComponent},
    {path: 'actualizar-estudiante/:id',component: ActualizarEstudianteComponent},
    {path: 'detalles-estudiante/:id', component: DetallesEstudiantesComponent},
    {path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent},
    {path: 'agregar-usuario', component: AgregarUsuarioComponent},
    {path: 'usuarios-inactivos',component: ListarUsuariosInactivosComponent},
    {path: 'aulas/primaria/agregar', component: AgregarAulaPrimariaComponent},
    {path: 'aulas/secund', component: TableComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}