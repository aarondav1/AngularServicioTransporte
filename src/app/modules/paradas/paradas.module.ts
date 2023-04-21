import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasCrudComponent } from './pages/paradas-crud/paradas-crud.component';
import { ParadasFormularioComponent } from './pages/paradas-formulario/paradas-formulario.component';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParadasRoutingModule } from './paradas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ParadasCrudComponent,
    ParadasFormularioComponent
  ],
  exports:[
    ParadasCrudComponent,
    ParadasFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ParadasRoutingModule,
    SharedModule
  ]
})
export class ParadasModule { }
