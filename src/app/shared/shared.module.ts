import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SharedRoutingModuleModule } from './shared-routing-module.module';



@NgModule({
  declarations: [
    ErrorPageComponent,
    DataTableComponent
  ],
  exports:[
    DataTableComponent,
    SharedRoutingModuleModule
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
