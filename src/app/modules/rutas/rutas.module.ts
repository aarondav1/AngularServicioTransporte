import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutasCrudComponent } from './pages/rutas-crud/rutas-crud.component';
import { RutasFormularioComponent } from './modals/rutas-formulario/rutas-formulario.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RutasRoutingModule } from './rutas-routing.module';
import { AsignacionRutaParadaComponent } from './modals/asignacion-ruta-parada/asignacion-ruta-parada.component';



@NgModule({
  declarations: [
    RutasCrudComponent,
    RutasFormularioComponent,
    AsignacionRutaParadaComponent
  ],
  exports:[
    RutasCrudComponent,
    RutasFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RutasRoutingModule
  ]
})
export class RutasModule { }
