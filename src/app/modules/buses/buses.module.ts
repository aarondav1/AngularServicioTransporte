import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusesCrudComponent } from './pages/buses-crud/buses-crud.component';
import { BusesFormularioComponent } from './modals/buses-formulario/buses-formulario.component';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusesRoutingModule } from './buses-routing.module';
import { AsignacionBusRutaComponent } from './modals/asignacion-bus-ruta/asignacion-bus-ruta.component';



@NgModule({
  declarations: [
    BusesCrudComponent,
    BusesFormularioComponent,
    AsignacionBusRutaComponent
  ],
  exports:[
    BusesCrudComponent,
    BusesFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BusesRoutingModule
  ]
})
export class BusesModule { }
