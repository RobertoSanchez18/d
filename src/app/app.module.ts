import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars'
import { FiltroPorFechaPipe } from './FiltroPorFecha.pipe';



import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './vistas/listar-estudiantes/table.component';
import { HomeComponent } from './vistas/Panel de Control/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReportesComponent } from './vistas/reportes/reportes.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { AulasComponent } from './vistas/aulas-secundaria/aulas.component';
import { AgregarEstudianteComponent } from './vistas/agregar-estudiante/agregar-estudiante.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActualizarEstudianteComponent } from './vistas/actualizar-estudiante/actualizar-estudiante.component';
import { DetallesEstudiantesComponent } from './vistas/detalles-estudiantes/detalles-estudiantes.component';
import { ListarInactivosComponent } from './vistas/listar-inactivos-estudiantes/listar-inactivos.component';
import { AulasPrimariaComponent } from './vistas/aulas-primaria/aulas-primaria.component';
import { ActualizarUsuarioComponent } from './vistas/actualizar-usuario/actualizar-usuario.component';
import { AgregarUsuarioComponent } from './vistas/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosInactivosComponent } from './vistas/listar-usuarios-inactivos/listar-usuarios-inactivos.component';
import { FilterPipe } from './filter.pipe';
import { FilterBySearchTermPipe } from './filter-by-search-term.pipe';
import { SalonesComponent } from './vistas/aulas-secundaria/salones/salones.component';
import { AgregarAulaSecundariaComponent } from './vistas/aulas-secundaria/agregar-aula-secundaria/agregar-aula-secundaria.component';
import { AgregarAulaPrimariaComponent } from './vistas/aulas-primaria/agregar-aula-primaria/agregar-aula-primaria.component';
import { ShearchFilterStudentsPipe } from './shearch-filter-students.pipe';
import { LoginComponent } from './auth/login/login.component';
import { ActualizarAulaComponent } from './vistas/aulas-secundaria/actualizar-aula/actualizar-aula.component';
import { AttendanceComponent } from './vistas/attendance/attendance.component';
import { ViewAsistenciasComponent } from './vistas/view-asistencias/view-asistencias.component';
import { ViewDocentesComponent } from './vistas/view-docentes/view-docentes.component';




@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    SidebarComponent,
    ReportesComponent,
    UsuariosComponent,
    AulasComponent,
    AgregarEstudianteComponent,
    ActualizarEstudianteComponent,
    DetallesEstudiantesComponent,
    ListarInactivosComponent,
    AulasPrimariaComponent,
    ActualizarUsuarioComponent,
    AgregarUsuarioComponent,
    ListarUsuariosInactivosComponent,
    FilterPipe,
    FilterBySearchTermPipe,
    SalonesComponent,
    AgregarAulaSecundariaComponent,
    AgregarAulaPrimariaComponent,
    ShearchFilterStudentsPipe,
    LoginComponent,
    ActualizarAulaComponent,
    AttendanceComponent,
    ViewAsistenciasComponent,
    FiltroPorFechaPipe,
    ViewDocentesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
