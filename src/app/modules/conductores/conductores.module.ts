import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConductoresCrudComponent } from './pages/conductores-crud/conductores-crud.component';
import { ConductoresFormularioComponent } from './modals/conductores-formulario/conductores-formulario.component';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConductoresRoutingModule } from './conductores-routing.module';
import { AsignacionBusConductorFormularioComponent } from './modals/asignacion-bus-conductor-formulario/asignacion-bus-conductor-formulario.component';



@NgModule({
  declarations: [
    ConductoresCrudComponent,
    ConductoresFormularioComponent,
    AsignacionBusConductorFormularioComponent
  ],
  exports:[
    ConductoresCrudComponent,
    ConductoresFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ConductoresRoutingModule
  ]
})
export class ConductoresModule { }
